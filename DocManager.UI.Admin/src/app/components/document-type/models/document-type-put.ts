import { DocumentTypeView } from "./documenttype-view";

export class DocumentTypePut{
    id: string='';
    name: string='';
    description: string='';
    active:boolean=false;

    constructor(obj:DocumentTypeView){
           this.id = obj.id;   
           this.name = obj.name;
           this.description = obj.description;
           this.active = obj.active;
    }    
}