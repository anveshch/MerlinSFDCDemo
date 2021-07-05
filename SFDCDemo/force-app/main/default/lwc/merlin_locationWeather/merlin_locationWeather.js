import { LightningElement, track, wire, api } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import performCallout from '@salesforce/apex/merlin_APIController.performWeatherCallout';

 
export default class merlin_locationWeather extends LightningElement {
 
    @track lat;
    @track long;
 
    @track mapMarkers = [];
    zoomLevel = 10;
    @track value;
    weatherData;
    renderWeatherDetails = false;
    @api selectedLocationInfo;
 
        weathercolumns = [
        { label: 'Date', fieldName: 'Date', type: 'text' },
        { label: 'Temperature °C', fieldName: 'Temp', type: 'text' },
        { label: 'Max. Temp °C', fieldName: 'MaxTemp', type: 'text' },
        { label: 'Min.Temp °C', fieldName: 'MinTemp', type: 'text' },
        { label: 'Snow', fieldName: 'Snow', type: 'text' },
        { label: 'Precipitation ', fieldName: 'Pres', type: 'text' },
        { label: 'UV', fieldName: 'UV', type: 'text' }
    ];

    connectedCallback() {
      
    }

    @wire(performCallout, { location: '$selectedLocationInfo.City_Code__c'})
    performCallout({ error, data }) {
        if (data) {
            window.console.log('Weather Data wire');   
            window.console.log(data);
                let result = data;
                let preparedData = [];
                result.data.forEach(eachday => {
                    let day = {};
                    day.Date = eachday.datetime_Z;
                    day.Temp = eachday.temp;                   
                    day.MaxTemp = eachday.min_temp;
                    day.MinTemp = eachday.max_temp;
                    day.Snow = eachday.snow;
                    day.Pres = eachday.pres;
                    day.UV = eachday.uv;
                    preparedData.push(day);
            });
            this.weatherData = preparedData;
            this.mapMarkers = [{
                location: {
                    Latitude: result['lat'],
                    Longitude: result['lon']
                },
                title: result['city_name'] + ', ' + result['state_code'],
            }];
            this.renderWeatherDetails = true;
        } else if (error) {
            console.log(error);
            this.error = error;
        }
    }
 
}