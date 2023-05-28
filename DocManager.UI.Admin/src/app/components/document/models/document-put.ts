import { DocumentView } from "./document-view";


export class DocumentPut {
    id: string;
    title: string;
    description: string;
    documentTypeId: string;
    documentPartnersId: string;
    validity: string;
    url: string;
    active: boolean;

  constructor(documentView:DocumentView) {
    this.id = documentView.id;
    this.title = documentView.title;
    this.description = documentView.description;
    this.documentTypeId = documentView.documentTypeId;
    this.documentPartnersId = documentView.documentPartnersId;
    this.validity = documentView.validity;
    this.url = documentView.url
    this.active = documentView.active;
  }

}
