import { DocumentPartnersView } from "./document-partners-view";

export class DocumentPartnersPut{
    id: string='';
    name: string='';
    description: string='';
    active:boolean=false;

    constructor(obj:DocumentPartnersView){
           this.id = obj.id;   
           this.name = obj.name;
           this.description = obj.description
           this.active = obj.active;
    }    
}