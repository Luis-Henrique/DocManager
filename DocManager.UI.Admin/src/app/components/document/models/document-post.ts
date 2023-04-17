import { DocumentView } from "./document-view";


export class DocumentPost {
    title: string;
    description: string;
    documentTypeId: string;
    validity: string;
    

  constructor(obj:DocumentView) {
    this.title = obj.title;
    this.description = obj.description;
    this.documentTypeId = obj.documentTypeId;
    this.validity = obj.validity;
  }

}
