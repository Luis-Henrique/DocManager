export class DocumentFilter {
    title: string;
    description: string;
    documentTypeId: string;
    documentPartnersId: string;
    active: string;
    page: number;
    pagesize:number;
    itemsByPage:number=0;
   
    constructor(title:string, description:string, documentTypeId:string, documentPartnersId:string, active:string,
                page:number, pagesize: number) {
        this.title = title;
        this.description = description;
        this.documentTypeId = documentTypeId;
        this.documentPartnersId = documentPartnersId;
        this.active = active;
        this.page = page;        
        this.pagesize = pagesize;
      }
}