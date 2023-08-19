import { DocumentView } from "./document-view";


export class DocumentPost {
    title: string;
    description: string;
    documentTypeId: string;
    documentPartnersId: string;
    validity: string;
    url:string;
    active: boolean;
    userGroupAutorization: string;

  constructor(obj:DocumentView) {
    this.title = obj.title;
    this.description = obj.description;
    this.documentTypeId = obj.documentTypeId;
    this.documentPartnersId = obj.documentPartnersId;
    this.validity = obj.validity;
    this.url = obj.url;
    this.active = obj.active;
    this.userGroupAutorization = obj.userGroupAutorization;
  }

}
