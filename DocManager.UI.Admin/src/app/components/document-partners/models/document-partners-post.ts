import { DocumentPartnersView } from "./document-partners-view";

export class DocumentPartnersPost{
       name: string='';
       description: string='';

       constructor(obj:DocumentPartnersView){
              this.name = obj.name;
              this.description = obj.description
       }
}