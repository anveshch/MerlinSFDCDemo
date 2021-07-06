import { LightningElement,track,api } from 'lwc';
export default class cataloggenericSpinnerComp extends LightningElement
{
    @api spinEnable; // Enables Spin
    @api isCustomSpin; // Standard or Custom Spin (Image)
    
    //#standardSpinParam
    @api variantStr;
    @api sizeStr;
    @api widthHeightStr;
    @api spinnerWithBackdrop = false;
    //#standardSpinParam

    //#customSpinParam - image URL should be set and it must be available as a document
	@track imageURL = 'https://www.merlinannualpass.co.uk/media/xg5paxpn/merlin-annual-pass-orb-400x400.png';
    //#customSpinParam

    @track spinnerDynamicClass='';

    @track spinnerText;
    @api
    setSpinnerData(spinEnableVar, isCustomSpinVar,spinnerTextVar,spinnerSize, spinnerVariant, spinnerWithBackdrop)
    {
        this.spinEnable = spinEnableVar;
        this.isCustomSpin = isCustomSpinVar;
        this.variantStr = spinnerVariant;
        this.sizeStr = spinnerSize;
        this.spinnerText = spinnerTextVar;
        this.spinnerWithBackdrop = spinnerWithBackdrop;
        this.spinnerDynamicClass = (this.spinnerWithBackdrop == true) ? "slds-backdrop slds-backdrop_open": "";       
        window.console.log('spinnerDynamicClass='+this.spinnerDynamicClass);

    }
    connectedCallback()
    {
        console.log('<<generic_spinnerComp>>'+this.imageURL);
        this.spinnerDynamicClass = (this.spinnerWithBackdrop == true) ? "slds-backdrop slds-backdrop_open": "";
    }
}