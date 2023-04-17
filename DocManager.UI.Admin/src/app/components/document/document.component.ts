import { Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../../services/document-service';
import { PagerService } from '../../services/page-service';
import { DocumentFilter } from './models/document-filter';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Utils } from 'src/app/utils/utils';
import { DocumentTypeService } from 'src/app/services/Document-type-service';
import { DocumentTypeView } from '../document-type/models/Document-type-view';
import { DocumentTypeFilter } from '../document-type/models/Document-type-filter';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit {
  @Input() modalTitle = ''
  @Input() modalBodyDetail = ''
  public setModalVisible = false;
  returnUrl: string ='/Document/Document';
  public deleteId = '';
  constructor(private formBuilder: FormBuilder,
              private DocumentService: DocumentService,
              private DocumentTypeService: DocumentTypeService,
              private pagerService: PagerService,
              private spinner: NgxSpinnerService,
              private utils: Utils

              ) {

              }

  
  private allItems: any[]=[];
  public pager: any = {};
  
  listTypes: DocumentTypeView[]=[];

  ngOnInit(): void {
    this.InitializeDependecies();
  }

  formFilter = new  FormGroup(
    {
      title: this.formBuilder.control(''),
      description: this.formBuilder.control(''),
      active: this.formBuilder.control('todos'),
      documentTypeId: this.formBuilder.control(''),
      itemsByPage: this.formBuilder.control('10')
    }
  );

  totalItem: number=0;
  pagedItems: any[]=[];

  itemsByPage = 10;
  firstPage = 1;
  currentPage = 1;

filterView(filter: DocumentFilter, page: number) {
  this.spinner.show();
  let eventFilter = new DocumentFilter(filter.title, filter.description, filter.documentTypeId, filter.active, page, this.itemsByPage);
  this.DocumentService.getByFilter(eventFilter).subscribe(view => {
    this.allItems = view.items;
    this.totalItem = view._total;
    this.pager = this.pagerService.getPager(this.totalItem, page, view._pageSize);
    this.pagedItems = this.allItems;
    this.currentPage = page;
    this.spinner.hide();
  }, error => {
    this.utils.showErrorMessage(error,'Pesquisar');   
    console.log(error);    
    this.spinner.hide();
  });
}

redirectTo(url:string) {
  this.utils.navigateTo(url,'')
}

redirectUpdate(url: string, id: string) {
  this.utils.navigateTo(url,id)
}

confirmdelete(){

  if (this.deleteId !== undefined && this.deleteId != '')  {
     
    this.spinner.show();
     this.DocumentService.delete(this.deleteId).subscribe((response: any) => {
          this.spinner.hide();
          this.utils.showSuccessMessage(response.message,'Sucesso')
      }, error => {
          this.spinner.hide();
          this.utils.showErrorMessage(error,'Erro');
      });
      this.setModalVisible = false;
      this.deleteId = '';
      this.filterView(this.formFilter.value,1);
  }

}

canceldelete(){
    this.setModalVisible = false;
    this.deleteId = '';
}

prepareDelete(id:string, name:string){

  this.deleteId = id;
  this.modalTitle = 'Excluir tipo de produto';
  this.modalBodyDetail = 'Deseja realmente excluir o registro ('+name+') ?';
  this.setModalVisible = true;
}


getProdutcTypes() {
  this.spinner.show();
  let eventFilter = new DocumentTypeFilter('','todos',0, 100);
  this.DocumentTypeService.getByFilter(eventFilter)
    .subscribe(typesview => {
      this.spinner.hide();
      var view = new DocumentTypeView();
      typesview.items.unshift(view);
      this.listTypes = typesview.items;
    }, error => {
      this.utils.showErrorMessage(error,'Tipo de produto');
      this.spinner.hide();
      console.log(error);
    });
}  

InitializeDependecies() {
  this.getProdutcTypes();

}



}

