import { LightningElement, api } from 'lwc';

export default class Merlin_locationDetails extends LightningElement 
{

    @api selectedLocationInfo;
    showLocationInfo = false;
    recordId;
    objAPIName;
    FieldsList=[];

    connectedCallback()
    {
        if(this.selectedLocationInfo!=undefined){
            this.showLocationInfo = true;
            this.recordId = this.selectedLocationInfo.Id;
            this.objAPIName = 'Merlin_Attraction__c';
            this.FieldsList = ['Name__c','Price__c','Timings__c','City_Code__c','Geo_Location__c'];        
        }

    }
}