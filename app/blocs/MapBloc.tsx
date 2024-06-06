
import MapService from "../api/MapService";



export default class MapBloc {
    mapService: MapService;

    constructor() {
        this.mapService = new MapService();
      }

      getMap(eventID: string){

        
        this.mapService.getMap(eventID);

      }


  }