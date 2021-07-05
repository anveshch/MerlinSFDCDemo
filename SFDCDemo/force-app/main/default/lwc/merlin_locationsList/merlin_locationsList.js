import { LightningElement, api, wire, track } from "lwc";

export default class Merlin_LocationsList extends LightningElement 
{

    @api attractionsData;
    showError = false;
    errorMsg ='';
    loadAttactionsList;
    gridlistviewtype ='grid-view';


    connectedCallback()
    {
        this.loadAttactionsList = true;
    }
}