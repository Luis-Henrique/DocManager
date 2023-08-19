import { GroupAutorizationView } from "./group-autorization-view";

export class GroupAutorizationPut{
    id: string='';
    name: string='';
    active:boolean=false;

    constructor(obj:GroupAutorizationView){
           this.id = obj.id;   
           this.name = obj.name;
           this.active = obj.active;
    }    
}