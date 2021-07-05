import { LightningElement, wire, track, api } from 'lwc'; 

// URL Navigation
import { CurrentPageReference } from 'lightning/navigation';
import {myCustomSLDSOverrideCSS} from 'c/merlin_commonCSS';


// Apex Calls
import getAttractions from '@salesforce/apex/Merlin_MainController.getAttractions';
// Apex Calls

export default class Merlin_Home extends LightningElement 
{

    //Main Variables - which decides to load Main page or pass details page(from email)
    renderMerlinHomePage;
    renderPassDetailsPage;

   
    imageURL = 'https://www.merlinannualpass.co.uk/media/xg5paxpn/merlin-annual-pass-orb-400x400.png'; //#Hardcoded Merlin Logo   
    loadedPassId; // Identifie the pass id when user opens pass from email

    attractionsList; //Main variable which holds all attractions records   
    showCartCount;

    //Cart & Pricing related variables
    @track selectedLocations =[];//Stores list of selected attractions with pricing details after discount
    selectedLocationsWithoutDiscount=[];//Stores list of selected attractions with pricing details before discount
    discountMap = new Map();
    @track netPrice = 0;
    @track oldnetPrice = 0;
    @track discount;
    cartAttractionsCount =0;

    //Popup/Overlay related Variables
    showMinicartPopup = false;
    showLocationCard = false;
    showPaymentCard = false;

    //Error Message relaetd
    showError = false;
    errorMsg ='';

    selectedLocInfo;//Stores selected location info - fetched form loctaion child component

       //////******* On Load Actions/////////// */  
    connectedCallback()
    {
        //Identify param to load pass detais or Main Page
        var sPageURL = decodeURIComponent(window.location.search.substring(1));
        if(sPageURL!=''&& sPageURL!=undefined)
        {
            var keyValPair = sPageURL.split('=');
            if(keyValPair[0] == 'passid')
            {
                this.renderPassDetailsPage = true;
                this.renderMerlinHomePage = false;
                this.loadedPassId = keyValPair[1];
            }
            else {   this.loadMainCOmponent();  }

        }
        else {    this.loadMainCOmponent();  }
        window.console.log(sPageURL);

          
    }

     //Renders Main component - when no param in URL
    loadMainCOmponent()
    {
        myCustomSLDSOverrideCSS(); // Load Custom CSS changes
            this.renderPassDetailsPage = false;
            this.renderMerlinHomePage = true;
            this.showCartCount = (this.cartAttractionsCount > 0) ? true : false;  
            this.setDiscounts();

    }

    //Set discounts - #Hardcoded
    setDiscounts()
     {
         
        this.discountMap = new Map();
        //Map(key,value) - (quantoty, discount %)
        this.discountMap.set(2, 3);
        this.discountMap.set(3, 5);
        this.discountMap.set(4, 7.5);
        this.discountMap.set(5, 10);


     }
       //////******* On Load Actions/////////// */  

    //////******* Wire - To Fetch all attractions/////////// */
    // #getAttraction - get all location details
	@wire(getAttractions)
	userData({error, data}) {
		if(data) {		
			this.attractionsList = data;
            this.showError = false;	
            window.console.log('getAttractions');	
            window.console.log(data);	
            window.console.log(this.attractionsList);
		} 
		else if(error) {
            this.errorMsg = 'Issue loading page , Please contact system administrator' ;
            this.showError = true;
			window.console.log('Issue loading page , Please contact system administrator'+JSON.stringify(error))
		} 
	}
	 // #getAttraction - get all location details
       //////******* Wire - To Fetch all attractions/////////// */

     

       //////******* General Actions/////////// */  
    //Updated pricing & other location details - when user added an attraction to cart
    handleLocationUpdation(event)
    {
        if( this.cartAttractionsCount<5)
        {
       var locationselected = event.detail;
       this.selectedLocationsWithoutDiscount.push(locationselected);
       if(locationselected != undefined)
       {
            this.cartAttractionsCount = this.selectedLocations.push(locationselected);
            this.showCartCount = (this.cartAttractionsCount > 0) ? true : false;
       }
        //Check if disocunt map contains value - else take discount as 0;   
         this.discount = this.discountMap.has(this.cartAttractionsCount)?  this.discountMap.get(this.cartAttractionsCount): 0;        
           this.netPrice = 0;
           this.oldnetPrice = 0;
           let discountedPriceMap = JSON.parse(JSON.stringify(this.selectedLocationsWithoutDiscount));//deep clone - to avoid caching of main property
           discountedPriceMap = discountedPriceMap.map(item => {
                item.oldprice = item.Price__c;
                this.oldnetPrice = this.oldnetPrice + item.oldprice;
                item.Price__c = item.Price__c - ( this.discount/100)*item.Price__c;
                this.netPrice = this.netPrice+item.Price__c
                return item;
            })
           this.selectedLocations = discountedPriceMap;
           let successmessage =  ( this.discount > 0) ? 'Discount '+ this.discount+'% applied to the attractions' : '';
           this.template.querySelector("c-generic_error-comp").setErrorMsgParam('Added to Cart', successmessage , "success");
             }   

            else
            {
                this.template.querySelector("c-generic_error-comp").setErrorMsgParam('Limit Exceeded', 'Max 5 attractions are allowed for selection', "error");
            }
            window.console.log(this.netPrice);
        }

        //Handles - opening of location info - details, weather,map - when user clicks on info icon
        handleLocationInfoRequest(event)
        {
            this.selectedLocInfo = event.detail;
            this.showLocationCard = true;

        }

        //Handles - opening of payment info - customer info , payment info when user click on Proceedtopayment button
        handlePaymentInfoRequest(event)
        {
            if(this.cartAttractionsCount>0)
            {
                this.showPaymentCard = true;
            }
            else
            {
                this.template.querySelector("c-generic_error-comp").setErrorMsgParam('No Attractions selected', 'Please add atleat 1 attraction to cart to proceed to payment', "error");
            }
           

        }
         //////******* General Actions/////////// */  


          //////******* UI - Popup related/////////// */  

        //Popup related actions
        closeModal()
        {
            this.showMinicartPopup = false;
            this.showLocationCard = false;
            this.showPaymentCard = false;
        }
        
        handleMinicartPopup()
        {
            if (this.showMinicartPopup == false) {
                this.showMinicartPopup = true;
              } else {
                this.showMinicartPopup = false;
              }
        }
           //////******* UI - Popup related/////////// */  

}