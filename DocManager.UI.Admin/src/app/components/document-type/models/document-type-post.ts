import { DocumentTypeView } from "./Document-type-view";

export class DocumentTypePost{
       name: string='';
       description: string='';

       constructor(obj:DocumentTypeView){
              this.name = obj.name;
              this.description = obj.description
       }
}