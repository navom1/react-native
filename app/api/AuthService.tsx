
import axios from 'axios';
import { logger } from "react-native-logs";
import AuthResponse from '@/app/entities/AuthResponse';
import { plainToClass } from 'class-transformer';


export default class AuthService{
  
  //API path that this service class uses
   apiPath = "api/auth";

  //create full URI for the API endpoint
  API_URL = process.env.API_URL + ":" + process.env.API_PORT +   this.apiPath;
  
  //logger
  log: any;

 
    constructor() {
      this.log = logger.createLogger();
    }


  /* Requires
	"name": "brandon",
    "username": "navom1",
    "email": "navomdkdkdkd@yahoo.com",
    "password":  "password"
    */

    
 async  register(name: string, username: string, email: string, password: string) : Promise<string>{
 

  const body = {
    'name': name,
    'username': username,
    'email': email,
    'password':  password
    };

    this.log.info('calling REST API at:' + this.API_URL);
    this.log.info('with a requestBody:' + body);
    
    axios.post(this.API_URL + '/', body)
      .then(response => {
        this.log.info(response.data);
        this.log.info(response.status);
        this.log.info(response.headers);

        return response.data; 
    
      })
      .catch(error => {
        this.log.error("Error sending data: ", error);
        
      });

         return "error";
           
  }
  
	/*
    "usernameOrEmail": "navom1@yahoo.com",
    "password":  "password"
  */

    async login(usernameOrEmail: string, password: string)  : Promise<AuthResponse> {

    const authResponse = new AuthResponse(); 


    const body = {
      'username': usernameOrEmail,
      'password':  password
      };
  
      this.log.info('calling REST API at:' + this.API_URL);
      this.log.info('with a requestBody:' + body);
    

      axios.post(this.API_URL + '/login', body)
        .then(response => {
          this.log.info(response.data);
          this.log.info(response.status);
          this.log.info(response.headers);
  
          //authResponse.token =  response.data.token;
          //authResponse.role = response.data.role;

          //use the class-transformer util to map JSON to the object
          let users = plainToClass(AuthResponse, response.data);
             
        })
        .catch(error => {
          this.log.error("Error sending data: ", error);
          
        });
  
     
        return authResponse;     


  }


  /*
   const path = `/users/${userId}.json`;
    const opt = Object.assign({}, options, { handle422: true });
    API.makePutRequest(path, key, userData, opt);
  */

};