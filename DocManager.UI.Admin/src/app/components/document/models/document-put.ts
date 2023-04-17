import { DocumentView } from "./document-view";


export class DocumentPut {
    id: string;
    title: string;
    description: string;
    documentTypeId: string;
    validity: string;
    active: boolean;

  constructor(documentView:DocumentView) {
    this.id = documentView.id;
    this.title = documentView.title;
    this.description = documentView.description;
    this.documentTypeId = documentView.documentTypeId;
    this.validity = documentView.validity;
    this.active = documentView.active;
  }

}
