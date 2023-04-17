import { DocumentTypeView } from "./Document-type-view";

export class DocumentTypePost{
       name: string='';

       constructor(obj:DocumentTypeView){
              this.name = obj.name;
       }
}