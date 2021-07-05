import { LightningElement, api,track } from 'lwc';

export default class Merlin_Location extends LightningElement 
{

    _location;
    @api locationcss;
    isgridviewtype = true;
    name;
    timing;
    image;
    selected;
    price;


    @api
    get location() {
        return this._product;
    }
    set location(value) {
        this._location = value;
        this.name = value.Name__c;
        this.timing = value.Timings__c;
        this.image = value.Location_Image__c;
        this.price = value.Price__c;

    }

    connectedCallback()
    {
       
    }

    //Action - called when user clicked on add to cart
    handleAddToCart()
    {
        this.selected= true;
        const locationselectedEvent = new CustomEvent('locationselected', {
            detail: this._location,
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(locationselectedEvent);

    }

     //Action - called when iser clicked on info icon
    handleLocationDetails()
    {

        const locationInfoReqEvent = new CustomEvent('locationinforequest', {
            detail: this._location,
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(locationInfoReqEvent);

    }


}