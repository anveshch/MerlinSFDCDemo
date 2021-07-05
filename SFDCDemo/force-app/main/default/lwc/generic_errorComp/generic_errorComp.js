import { LightningElement,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class cataloggenericErrorComp extends LightningElement
{
      // #mainParam
    @api titleStr = 'Title';
    @api msgStr = 'Default Message';
    @api varStr = 'error';
    @track toastClasses;
    @track toastIcon;
	@track showErrorModal = false;    
    // #mainParam
	
    // #method toInvokeError - Called from Parent Component
    //This Method will set data for toast message & show toast message. - Timer same as salesforce toast(auto close after 4 sec)
	@api
	setErrorMsgParam(titleString,messageString,variantString)
	{
		//console.log('<<setErrorMsgParam>>'+titleString+'<<>>'+messageString+'<<>>'+variantString);
		var tempClasses = 'slds-notify slds-notify_toast slds-theme_';
        var tempIcon = 'utility:';
        this.toastClasses = tempClasses + variantString;
        this.toastIcon = tempIcon + variantString;       
        let disableTimerToast = false;
		this.errorToastMethod(titleString,messageString,variantString,disableTimerToast);
	}

    // #method toInvokeError - Called from Parent Component
     //This Method will set data for toast message & show toast message. - No Timer - No Auto close
	@api
	setErrorMsgParamNoTimer(titleString,messageString,variantString)
	{
		//console.log('<<setErrorMsgParam>>'+titleString+'<<>>'+messageString+'<<>>'+variantString);
		var tempClasses = 'slds-notify slds-notify_toast slds-theme_';
        var tempIcon = 'utility:';
        this.toastClasses = tempClasses + variantString;
        this.toastIcon = tempIcon + variantString;       
        let disableTimerToast = true;
		this.errorToastMethod(titleString,messageString,variantString,disableTimerToast);
	}

     
    // #errorToastMethod - Helper to set content to toast and show it.
    errorToastMethod(titleString,messageString,variantString,disableTimerToast)
    {
        this.showErrorModal = true;
        if(titleString)
        {
            this.titleStr = titleString;
        }
        if(messageString)
        {           
            // as this.template.queryselector throws issue as template not rendered yet..adding negligable delay to it.
           setTimeout(() => {
               if(this.template.querySelector('.messagecss') != undefined)
               {
                    this.template.querySelector('.messagecss').innerHTML = messageString;
               }
        }, 100);                   
        }

        if(disableTimerToast == false)
        {       
            setTimeout(() =>
            {               
                this.closeModel();
            }, 5000);
      }
    }
    // #errorToastMethod
    
    closeModel()
    {		
        this.showErrorModal = false;
	}
}