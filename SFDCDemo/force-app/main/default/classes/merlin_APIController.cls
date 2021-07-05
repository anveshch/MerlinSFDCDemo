/*********************************************************************************************************************
 * Apex Class Name   :  merlin_APIController 
 * Created By        :  SFDC Demo
 * Created Date      :   July 07 2021
 * Description       :   API Helper for Merlin_MainController    
 ------------------------------------------------------------------------------------------------------------------*/
public class merlin_APIController {
 
    @AuraEnabled (cacheable=true)
    public static weatherJsontoApex performWeatherCallout(String location) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:WeatherAPI?city=' + location + '&key=50e50ffbec7b4c8d81c1ddc0c21d3eb5');//#HardcodedKey
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res = http.send(req);
        String result = res.getbody();
        system.debug(result);
        weatherJsontoApex obj = weatherJsontoApex.parse(result);
        system.debug(obj);
       return obj;

    }  
    
    @future(callout=true)
    public static void sendSMSAsync(String Phonenumber, String PassName) {
        system.debug('##sendSMSAsync'+Phonenumber+'pass'+PassName);  
        merlin_TwilioSendSMS.sendSms(Phonenumber, PassName); 
    }
    
}
