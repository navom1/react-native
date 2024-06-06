import axios from 'axios';
import { logger } from "react-native-logs";
import {kml} from '@tmcw/togeojson';
import {DOMParser} from 'xmldom';
import DocumentPicker from 'react-native-document-picker';


export default class MapService{
  
  //API path that this service class uses
  apiPath = "api/auth";

  //create full URI for the API endpoint
  API_URL = process.env.API_URL + ":" + process.env.API_PORT +   this.apiPath;
  
  //logger
  log: any;

 
    constructor() {
      this.log = logger.createLogger();
    }


    async getMap(eventID: string){

        try {
            const res = await DocumentPicker.pick({
                type: ['application/vnd.google-earth.kml+xml'],
                allowMultiSelection: false,
            });
        
            const read = await readFile(res[0].uri);
            const theKml = new DOMParser().parseFromString(read);
            const converted = kml(theKml);
            
            return converted;

            } catch (err) {
              if (DocumentPicker.isCancel(err)) {
                // handle error
              } else {
                throw err;
              }
            }

    }





}