import { DocumentTypeView } from "./documenttype-view";

export class DocumentTypePost{
       name: string='';

       constructor(obj:DocumentTypeView){
              this.name = obj.name;
       }
}