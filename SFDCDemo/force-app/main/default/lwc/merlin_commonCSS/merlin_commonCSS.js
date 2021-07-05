import { LightningElement, api } from 'lwc';

const myCustomSLDSOverrideCSS = () => {

    let customSldsStyleOverrideCSS = document.createElement('style');
    customSldsStyleOverrideCSS.textContent  = `
    /*Below CSS is to override slds css Overall Page*/
              
            .locationweather table { background-image: url(https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260) !important;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                font-weight: 500;
                color: black;
            }
    `;    
    document.body.appendChild(customSldsStyleOverrideCSS);
}

/* Export the module */
export {myCustomSLDSOverrideCSS};