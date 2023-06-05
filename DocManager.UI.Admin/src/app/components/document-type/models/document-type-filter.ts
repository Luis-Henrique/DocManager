export class DocumentTypeFilter{
    name: string;
    description: string;
    active: string;
    page: number;
    pageSize: number;
    itemsByPage:number=0;

    constructor(_name:string, _description:string, _active:string, _page:number, _pageSize: number){
        this.name = _name;
        this.description = _description;
        this.active = _active;
        this.page = _page;
        this.pageSize = _pageSize;
    }
}