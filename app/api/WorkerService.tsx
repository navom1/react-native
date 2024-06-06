
import axios from 'axios';
import { logger } from "react-native-logs";
import AuthResponse from '@/app/entities/AuthResponse';
import { plainToClass } from 'class-transformer';


export default class WorkerService{
  
  //API path that this service class uses
   apiPath = "api/worker";

  //create full URI for the API endpoint
  API_URL = process.env.API_URL + ":" + process.env.API_PORT +   this.apiPath;
  
  //logger
  log: any;

    constructor() {
      this.log = logger.createLogger();
    }



  /*
      Request body:

      private Long userID;
      private Long eventID;
      private String role;
      private String desiginator;


              Roles:
              1	"ADMIN"
              2	"EVENT_ORGINIZER"
              3	"MEDICAL"
              4	"SECURITY"
              5	"DISPATCHER"
              6	"ATTENDEE"
              7	"WORKER"
  */
            
  async  setWorker(userID: string, eventID: string, role: string, designator: string) : Promise<string>{

    const body = {
      'userID': userID,
      'eventID': eventID,
      'erole': role,
      'designator':  designator
    };

    this.log.info('calling REST API at:' + this.API_URL);
    this.log.info('with a requestBody:' + body);
    
    axios.post(this.API_URL + '/', body)
      .then(response => {
        this.log.info(response.data);
        this.log.info(response.status);
        this.log.info(response.headers);

        //return WorkerID
        return response.data; 
    
      })
      .catch(error => {
        this.log.error("Error sending data: ", error);
        
      });

        return "error";
    }



  /*
  Method: setWorkerOnDuty

  Parameters: workerID

  returns: void
  */

  async  setWorkerOnDuty(workerID: string){


    this.log.info('calling REST API at:' + this.API_URL);
    
    axios.post(this.API_URL + '/' + workerID +'/OnDuty')
      .then(response => {
        this.log.info(response.data);
        this.log.info(response.status);
        this.log.info(response.headers);

      
      })
      .catch(error => {
        this.log.error("Error sending data: ", error);
        
      });

  }



  /*
  Method: setWorkerOffDuty

  Parameters: workerID

  returns: void
  */

  async  setWorkerOffDuty(workerID: string){


    this.log.info('calling REST API at:' + this.API_URL);
    
    axios.post(this.API_URL + '/' + workerID +'/OffDuty')
      .then(response => {
        this.log.info(response.data);
        this.log.info(response.status);
        this.log.info(response.headers);

      
      })
      .catch(error => {
        this.log.error("Error sending data: ", error);
        
      });


  }
};