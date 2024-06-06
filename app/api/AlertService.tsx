
import axios from 'axios';
import { logger } from "react-native-logs";


class AlertService {

    //API path that this service class uses
    apiPath = "api/alerts";

    //create full URI for the API endpoint
    apiUrl = process.env.API_URL + ":" + process.env.API_PORT +   this.apiPath;
    
   
     //logger
    log: any;

    constructor() {
        this.log = logger.createLogger();
    }

    async sendAlert(userID: string, eventID: string, longitutde: string, latitude: string ) {
        const body = {
            'nuserID': userID,
            'eventID': eventID,
            'longitutde': longitutde,
            'platitude':  latitude
        };
    
        this.log.info('calling REST API at:' + this.apiUrl );
        this.log.info('with a requestBody:' + body);
        
        axios.post(this.apiUrl + '/', body)
            .then(response => {
            this.log.info(response.data);
            this.log.info(response.status);
            this.log.info(response.headers);
    
            return response;
            })
            .catch(error => {
            this.log.error("Error sending data: ", error);
            });
    

    }


    async setAlertResponding(responderID: string, eventID: string,   alertID: string) {

        const body = {
            'responderID': responderID,
            'eventID': eventID,
            'status' : 'responding'
        };
    
        this.log.info('calling REST API at:' + this.apiUrl  + alertID);
        this.log.info('with a requestBody:' + body);
        
        axios.put(this.apiUrl  + '/' + alertID, body)
            .then(response => {
            this.log.info(response.data);
            this.log.info(response.status);
            this.log.info(response.headers);
    
            return response;
            })
            .catch(error => {
            this.log.error("Error sending data: ", error);
            });
    
        
    }

    async setAlertOnScene(responderID: string, eventID: string,   alertID: string) {

        const body = {
            'responderID': responderID,
            'eventID': eventID,
            'status' : 'onScene'
        };
    
        this.log.info('calling REST API at:' + this.apiUrl  + alertID);
        this.log.info('with a requestBody:' + body);
        
        axios.put(this.apiUrl  + '/' + alertID, body)
            .then(response => {
            this.log.info(response.data);
            this.log.info(response.status);
            this.log.info(response.headers);
    
            return response;
            })
            .catch(error => {
            this.log.error("Error sending data: ", error);
            });
    
        
    }


}


