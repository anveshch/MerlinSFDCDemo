import { LightningElement, track, api} from 'lwc';  
 import saveRecord from '@salesforce/apex/Merlin_MainController.saveCustomer';  
 import savePassRecord from '@salesforce/apex/Merlin_MainController.savePass';  
 import { NavigationMixin } from 'lightning/navigation';  
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';  
 const MAX_FILE_SIZE = 100000000; //10mb  
 export default class NewRecordWithFileUpload extends NavigationMixin(LightningElement) { 
   @api selectedLocationInfo;
   @api netprice;
   @api discount;
   @api loadedPassId;

   //CustomerForm Variables
    name;
    phone;  
    @track email;  
    age;
    @track traveldate; 
    uploadedFiles = []; 
    file;
    fileContents; 
    fileReader; 
    content; 
    fileName;

    //Rended my form variables
    renderCustomerDetailsForm = true;
    renderPaymentDetailsForm = false;
    renderFinalSuccessForm = false;

    //Form status track variables
    addresscompleted=false;
    paymentcompleted=false;
  
    customerId;
    @track passId;
    @track selectedpayment = 'creditcard';
    @track googleCaptachURL;
    @track isguestuser;

    //spinner
    showSpin = false;
    cusSpin = false;


    connectedCallback()
    {
        //Identify if guest users logged in or internal user & accordingly open Google Captcha
        if (window.location.origin.indexOf('anvesh') > -1) {
          this.isguestuser = true;
          this.googleCaptachURL = 'https://anvesh-demo-developer-edition.ap24.force.com/MerlinPassDemo/apex/Merlin_GoogleRecaptcha';//#Hardcoded
        }
        else
        {
          this.isguestuser = false;
          this.googleCaptachURL = 'https://d5g000005vtpteas-dev-ed--c.visualforce.com/apex/Merlin_GoogleRecaptcha';//#Hardcoded
        }

    }

    get paymentOptions() {
      return [
          { label: 'Credit Card', value: 'creditcard' },
          { label: 'UPI', value: 'upi' },
          { label: 'Wallet', value: 'wallet' }
      ];
  }

   onNameChange(event) {  
     this.name = event.detail.value;  
   }  
   onPhoneChange(event) {  
     this.phone = event.detail.value;  
   }  
   onEmailChange(event) {  
     this.email = event.detail.value;  
   }  
   onAgeChange(event) {  
     this.age = event.detail.value;  
   }
   onTravelDateChange(event) {  
    this.traveldate = event.detail.value;  
  }  
   onFileUpload(event) {  
     if (event.target.files.length > 0) {  
       this.uploadedFiles = event.target.files;  
       this.fileName = event.target.files[0].name;  
       this.file = this.uploadedFiles[0];  
       if (this.file.size > this.MAX_FILE_SIZE) {  
         alert("File Size Can not exceed" + MAX_FILE_SIZE);  
       }  
     }  
     else
     { 
        this.template.querySelector("c-generic_error-comp").setErrorMsgParam('Please Enter all the information', ' ' , "error");
    }
   }  
   
   saveCustomerDetails() {
         if( this.name=='' ||  this.name ==undefined ||this.phone=='' ||  this.phone ==undefined || this.email=='' ||  this.email ==undefined || this.age=='' ||  this.age ==undefined ||  this.traveldate ==undefined || this.fileName =='' || this.fileName == undefined)
        {
            this.template.querySelector("c-generic_error-comp").setErrorMsgParam('Please Enter all the information', ' ' , "error");
         }
         else
         {
            this.fileReader = new FileReader();  
            this.fileReader.onloadend = (() => {  
            this.fileContents = this.fileReader.result;  
            let base64 = 'base64,';  
            this.content = this.fileContents.indexOf(base64) + base64.length;  
            this.fileContents = this.fileContents.substring(this.content);  
            this.saveRecord();  
            });  
            this.fileReader.readAsDataURL(this.file);  
        }
   } 
    
   
   handlePaymentProcess(event)
   {
       window.console.log('payment process event');
       window.console.log(event.detail);
       this.paymentcompleted=true;
       this.checkToGeneratePass();
   }
    handleAddressCompletion(event)
   { 
        window.console.log('Address process event');  
        window.console.log(event.detail);
        this.addresscompleted=true;
        this.checkToGeneratePass();
   }

   checkToGeneratePass()
   {
       if(this.paymentcompleted &&  this.addresscompleted)
       {  
           this.savePassRecord();
        }
        else
        {                    
        this.template.querySelector("c-generic_error-comp").setErrorMsgParam('Please complete all required fields', 'Verify card & address information ' , "error");
        }

   }

   //Create Customer Record Object 
   saveRecord() {  
     //Switch on SPinner
     this.showSpin = true;
     this.cusSpin = true;

    var customerObj = {  
      'sobjectType': 'Merlin_Customer__c',  
      'Name__c': this.name,  
      'Email__c': this.email,  
      'Phone__c': this.phone,  
      'Age__c': this.age,
      'Travel_Date__c': this.traveldate
    }  
    window.console.log('customerObj'+customerObj);
    saveRecord({  
      customerRec: customerObj,  
      file: encodeURIComponent(this.fileContents),  
      fileName: this.fileName  
    })  
      .then(customerId => {  
        if (customerId) {  
           window.console.log('saved response'+customerId);
           this.customerId = customerId;
           this.template.querySelector("c-generic_error-comp").setErrorMsgParam('Customer Information Saved', 'All the data submitted were safe & secured with us ' , "success");
            this.renderCustomerDetailsForm = false;
            this.renderPaymentDetailsForm = true;
             //Switch off Spinner
            this.showSpin = false;
            this.cusSpin = false;
          
        }  
      }).catch(error => {  
        console.log('error ', error); 
         //Switch off Spinner
         this.showSpin = false;
         this.cusSpin = false; 
      });  
  } 

   //Create Pass Record Object
   savePassRecord() {  
    var PassObj = {  
      'sobjectType': 'Merlin_Pass__c',  
      'Price__c': this.netprice,  
      'Customers__c': this.customerId,
      'Travel_Date__c':this.traveldate,
      'Discount__c':this.discount,      
      'Email__c':this.email     
    }  
    window.console.log('PassObj');
    window.console.log(PassObj);
    savePassRecord({  
      passRec: PassObj  
    })  
      .then(passId => {  
        if (passId) { 
          this.passId = passId;            
          this.renderPaymentDetailsForm = false; 
          this.renderCustomerDetailsForm = false;         
          this.renderFinalSuccessForm = true;
           window.console.log('saved response'+passId);
           this.template.querySelector("c-generic_error-comp").setErrorMsgParam('Pass Generated', 'Thanks for the purchase! ' , "success");
        }  
      }).catch(error => {  
        console.log('error ', error);  
      });  
  } 

 }  