import { LightningElement,api, wire } from 'lwc';
// Apex Calls
import getUserPhoto from '@salesforce/apex/Merlin_MainController.getUserPhoto';
// Apex Calls

export default class Merlin_passDetails extends LightningElement 
{

    renderPassDetailsForm;
    renderCustomerInfo;
    @api recordId;
    customerrecordId;
    objAPINamePass;
    objAPINameCustomer;
    FieldsListPass=[];
    FieldsListCustomer=[];
    imageUrl;

    connectedCallback()
    {
        if(this.recordId!=undefined){
            this.getUserPhoto();
            this.renderPassDetailsForm = true;
            this.renderCustomerInfo = false;
            this.objAPINamePass = 'Merlin_Pass__c';
            this.FieldsListPass = ['Name','Price__c','Travel_Date__c','Discount__c','QR_Code__c','Email__c'];
            this.objAPINameCustomer = 'Merlin_Customer__c';
            this.FieldsListCustomer = ['Name__c','Email__c','Age__c','Phone__c'];
        
        }

    }

    getUserPhoto() {  
        getUserPhoto({  
            passid: this.recordId  
        })  
          .then( data => {  
            if (data) { 
               this.customerrecordId = data.CustomerId;
               var baseurl = window.location.origin;
               this.imageUrl = baseurl+'/sfc/servlet.shepherd/version/download/'  + data.ContentVersionObjId;
               this.renderCustomerInfo = true;
            }  
          }).catch(error => {  
            console.log('error ', error);  
          });  
      } 
    
    /*@wire(getUserPhoto, { passid: '$recordId'})
    getUserPhoto({ error, data }) {
        window.console.log('inside wire pass');
        window.console.log(data);
        if (data) {	
            window.console.log('getUserPhoto');	
            window.console.log(data);
		} 
		else if(error) {
            this.errorMsg = 'Issue loading page , Please contact system administrator' ;
		} 
	}*/
}