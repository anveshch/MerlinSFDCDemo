public class merlin_TwilioSendSMS {    
    public static void sendSms(String Phonenumber, String PassName){   
       system.debug('##Sms'+Phonenumber+'pass'+PassName);  
        String phNumber =Phonenumber;        
        String accountSid = 'ACd68c9a631147de10cc305a72bbbdcc39'; //#Hardcoded    
        String token = '9ceaf0d1934b23ff996c3d4f2c44255d'; //#Hardcoded           
        String fromPhNumber = '9706209207';           
        String smsBody = 'Thanks for the purchase. Your pass is generated with Id-'+PassName+'. Please refer email for more details';        
        HttpRequest req = new HttpRequest();        
        req.setEndpoint('https://api.twilio.com/2010-04-01/Accounts/'+accountSid+'/SMS/Messages.json');        
        req.setMethod('POST');        
        String VERSION  = '3.2.0';        
        req.setHeader('X-Twilio-Client', 'salesforce-' + VERSION);        
        req.setHeader('User-Agent', 'twilio-salesforce/' + VERSION);       
        req.setHeader('Accept', 'application/json');        
        req.setHeader('Accept-Charset', 'utf-8');        
        req.setHeader('Authorization','Basic '+EncodingUtil.base64Encode(Blob.valueOf(accountSid+':' +token)));        
        req.setBody('To='+EncodingUtil.urlEncode(phNumber,'UTF-8')+'&From='+EncodingUtil.urlEncode(fromPhNumber,'UTF-8')+'&Body='+smsBody);        
        Http http = new Http();        
        HTTPResponse res = http.send(req);        
        System.debug(res.getBody());        
        if(res.getStatusCode()==201) 
        System.Debug('Message sending Successful');        
        else{            
            System.Debug('Message sending Unsuccessful');
        }        
    } 
}
