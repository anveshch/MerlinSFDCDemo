/*********************************************************************************************************************
 * Apex Class Name   :   Merlin_MainController
 * Created By        :  SFDC Demo
 * Created Date      :   July 07 2021
 * Description       :   This is apex controller for Merlin APplication    
 ------------------------------------------------------------------------------------------------------------------*/
 
public without sharing class Merlin_MainController {

    public Merlin_MainController()
    {

    }

    //Get all attractions data
    @AuraEnabled(Cacheable=true)
    public static List<Merlin_Attraction__c> getAttractions()
    {
        try {
            return [select id,Name__c,Timings__c,Location_Image__c,Price__c,City_Code__c,Geo_Location__c from Merlin_Attraction__c order by Name__c limit 1000];
            //Assuming we wont have more than 1000 attractions. If more attractions - Better to add offset to query and handle better
            
        } catch (Exception e) {
          system.debug('Exception while extracting Attractions'+e.getMessage());
           // throw new AuraHandledException(e.getMessage());
           return null;
        }
    }

    //Create customer object recorx, after user enters customer details
    @AuraEnabled  
    public static string saveCustomer(Merlin_Customer__c customerRec, string file, string fileName) {  
      string customerId;  
      try{  
        Insert customerRec;  
        customerId = customerRec.Id;  
        Database.SaveResult sr;
            String base64File = EncodingUtil.urlDecode(file, 'UTF-8');     
          ContentVersion contentVersionRec = new ContentVersion();  
          contentVersionRec.Title = fileName;  
          contentVersionRec.PathOnClient = '/' + fileName;  
          contentVersionRec.FirstPublishLocationId = customerRec.Id;  
          contentVersionRec.VersionData = EncodingUtil.base64Decode(base64File);  
          contentVersionRec.IsMajorVersion = true;  
          Insert contentVersionRec;  
          Id conDocument = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:contentVersionRec.Id].ContentDocumentId;
          Id ContentDocumentLink = [SELECT LinkedEntityId FROM ContentDocumentLink WHERE LinkedEntityId =:customerRec.Id].Id;

          ContentDocumentLink cDocLink = new ContentDocumentLink();
          cDocLink.Id=ContentDocumentLink;
          cDocLink.ShareType = 'V';//V – Viewer permission. C – Collaborator permission. I – Inferred permission.
          cDocLink.Visibility = 'AllUsers';//AllUsers, InternalUsers, SharedUsers
          Update cDocLink;
        

      } catch(Exception ex){  
        system.debug('Exception===>'+ex.getMessage());  
      }  
      return customerId;  
    }  
    
     //Create Pass Record - after payment is success
    @AuraEnabled  
    public static string savePass(Merlin_Pass__c passRec) {  
      string passId;  
      try{  
        Insert passRec;  
        passId = passRec.Id;  
      } catch(Exception ex){  
        system.debug('Exception===>'+ex.getMessage());  
      } 
      
      Merlin_Pass__c passsObj = [select Id,Name,Customers__r.Phone__c from Merlin_Pass__c where Id=:passId limit 1];
      String PassName = passsObj.Name; 
      String phone =  '+'+String.valueOf(passsObj.Customers__r.Phone__c); 
      //SendSMS   
      merlin_APIController.sendSMSAsync(phone,PassName);

      return passId;  
    }  

    //Get Pass details , after user opens pass from email
    @AuraEnabled  
    public static passwrapper getUserPhoto(String passid) { 
      Id passidParsed = Id.valueOf(passid);
      Merlin_Pass__c merlinpassObj;
      ContentVersion ContentVersionObj;
      passwrapper wrap = new passwrapper();

       if(passidParsed!=null)
       {         
         merlinpassObj= [select Id,Customers__c from Merlin_Pass__c where id=:passidParsed limit 1];
         string customerid=merlinpassObj.Customers__c;
         List<ContentVersion> ContentVersionLst = new  List<ContentVersion>();
         if(customerid!='' && customerid!=null)
         {
           ContentVersionLst = [select Id, ContentDocumentId from ContentVersion where FirstPublishLocationId=:customerid Limit 1];
         }
         wrap.CustomerId = merlinpassObj.Customers__c;
         if(ContentVersionLst.size()>0)
         {
            wrap.ContentVersionObjId = ContentVersionLst[0].Id;
         }

       }
      
      return wrap;  
    }  

    public class passwrapper
    {
      @AuraEnabled public String ContentVersionObjId;
      @AuraEnabled public String CustomerId;
    }

   

    
}
