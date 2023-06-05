import { Component, OnInit, OnChanges, EventEmitter, Output, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Guid } from 'guid-typescript';
import { Utils } from 'src/app/utils/utils';
import { DocumentView } from '../models/document-view';
import { DocumentTypeService } from 'src/app/services/document-type-service';
import { DocumentService } from 'src/app/services/document-service';
import { DocumentTypeFilter } from '../../document-type/models/document-type-filter';
import { DocumentTypeView } from '../../document-type/models/documenttype-view';
import { DocumentPost } from 'src/app/components/document/models/document-post'
import { DocumentPut } from 'src/app/components/document/models/document-put'
import { DocumentPartnersFilter } from '../../document-partners/models/document-partners-filter';
import { DocumentPartnersService } from 'src/app/services/document-partners-service';
import { DocumentPartnersView } from '../../document-partners/models/document-partners-view';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-document-maintenance',
  templateUrl: './document-maintenance.component.html'
})
export class DocumentMaintenanceComponent implements OnInit {
  public modalVisible = false;
  formChanges!: Observable<any>;

  @Input() disableForm = true;
  @Input() urlReturn = '/document/document';
  @Input() document: DocumentView = new DocumentView();
  public setModalVisible = false;
  @Input() modalBodyDetail = '';
  @Input() modalTitle = '';
  @Input() id: any = '';  
  idDefault = Guid.EMPTY;

  pager: any = {};
  totalItem: number=0;
  pagedItems: any[]=[];
  itemsByPage = 10;
  firstPage = 1;
  currentPage = 1;
  setToDeleteDocument = '';
  isCollapsed: boolean = true;
  validated: number=0;

  listDocumentType: DocumentTypeView[]=[];
  listDocumentPartners: DocumentPartnersView[]=[];

  action = 'Inserir';

  formDocument = new FormGroup({
    id: this.formBuilder.control(this.document.id),
    title: this.formBuilder.control(this.document.title),
    description: this.formBuilder.control(this.document.description),
    documentTypeId: this.formBuilder.control(this.document.documentTypeId),
    documentPartnersId: this.formBuilder.control(this.document.documentPartnersId),
    validity: this.formBuilder.control(this.datePipe.transform(this.document.validity, 'yyyy-MM-dd')),
    url: this.formBuilder.control(this.document.url),
    active: this.formBuilder.control(this.document.active)
  });  

  constructor(private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private activedRouter: ActivatedRoute,
              private documentPartnersService: DocumentPartnersService, 
              private documentTypeService: DocumentTypeService,
              private documentService: DocumentService,
              private datePipe: DatePipe,
              private utils : Utils) {}
  
  ngOnInit() {
    this.id = this.activedRouter.snapshot.params['id'];

    if (this.id != undefined && this.id != this.idDefault && this.id != null) {
      this.action = 'Alterar';
      this.getById(this.id);
    } else {
      this.action = 'Inserir';
      this.document = new DocumentView();
      this.formDocument.patchValue(this.document);
    }

    this.InitializeDependecies();

  }

  InitializeDependecies() {
    this.getDocumentTypes();
    this.getDocumentPartners();
  }

  getById(id: string) {
    this.spinner.show();
    this.documentService.getByID(id)
    .subscribe(view => {
      this.document = view;
      console.log('resposta do get...');
      console.log(JSON.stringify(this.document));
      this.updateForm(this.document);
      this.spinner.hide();
    }, error  => {
      this.utils.showErrorMessage(error,this.action);
      this.spinner.hide();
    });
  }

  saveChanges(document: any){
    if (this.document.id === undefined || this.document.id === '')
       this.insertDocument(document);
    else
       this.updateDocument(document);
  }

  /*validateForm(){
        var iTitle = (<HTMLInputElement>document.getElementById("title")).value;
        var iDescription = (<HTMLInputElement>document.getElementById("description")).value;
        var iDocumentTypeId = (<HTMLInputElement>document.getElementById("documentTypeId")).value;
        var iDocumentPartnersId = (<HTMLInputElement>document.getElementById("documentPartnersId")).value;
        var iValidity = (<HTMLInputElement>document.getElementById("validity")).value;
        var iUrl = (<HTMLInputElement>document.getElementById("url")).value;
        var dateValidity = new Date(iValidity);
        var CurrentDate = new Date(Date.now());

        if (iTitle == '' || iTitle == undefined) {
            this.showMessage('É necessário informar um titulo, verifique...');
            return;
        }       
        if (iTitle.length > 100) {
          this.showMessage('Titulo muito longo, máximo 100 caracteres, verifique...');
          return;
        }        
        if (iDescription == '' || iDescription == undefined){
            this.showMessage('É necessário informar uma descrição, verifique...');
            return;
        }
        if (iDescription.length > 200) {
          this.showMessage('Descrição muito longa, máximo 200 caracteres, verifique...');
          return;
        }  
        if (iDocumentTypeId == '' || iDocumentTypeId == undefined) {
          this.showMessage('É necessário selecionar um tipo de documento, verifique...');
          return;
        }
        if (iDocumentPartnersId == '' || iDocumentPartnersId == undefined) {
          this.showMessage('É necessário selecionar um parceiro, verifique...');
          return;
        }
        if (iValidity == '' || iValidity == undefined) {
          this.showMessage('É necessário selecionar uma data de expiração, verifique...');
          return;
        }  
        if (dateValidity <= CurrentDate) {
          this.showMessage('Data de expiração invalida, verifique...');
          return;
        }          
        if (iUrl == '' || iUrl == undefined) {
          this.showMessage('É necessário informar uma url, verifique...');
          return;
        }    
        if (!(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(iUrl))){
            this.showMessage('É necessário informar uma url valida, verifique...');
            return;
        }
        if (iUrl.length > 350) {
          this.showMessage('Url muito longa, máximo 350 caracteres, verifique...');
          return;
        } 
        this.validated = 1;
        return;
  }*/

  updateForm(document: DocumentView){
    var _validity = new Date(document.validity)
    this.formDocument = new FormGroup({
      id: this.formBuilder.control(document.id),
      title: this.formBuilder.control(document.title),
      description: this.formBuilder.control(this.document.description),
      documentTypeId: this.formBuilder.control(this.document.documentTypeId),
      documentPartnersId: this.formBuilder.control(this.document.documentPartnersId),
      validity: this.formBuilder.control(this.datePipe.transform(_validity.setDate(_validity.getDate() + 1), 'yyyy-MM-dd')),
      url: this.formBuilder.control(this.document.url),
      active: this.formBuilder.control(this.document.active)
  })
  }

  getDocumentTypes() {
    this.spinner.show();
    let eventFilter = new DocumentTypeFilter('','', 'todos',0, 100);
    this.documentTypeService.getByFilter(eventFilter)
      .subscribe(typesview => {
        this.spinner.hide();
        var view = new DocumentTypeView();
        typesview.items.unshift(view);
        this.listDocumentType = typesview.items;
        this.listDocumentType.shift();
      }, error => {
        this.utils.showErrorMessage(error,'Tipo de produto');
        this.spinner.hide();
        console.log(error);
      });
  }  

  getDocumentPartners() {
    this.spinner.show();
    let eventFilter = new DocumentPartnersFilter('','', 'todos',0, 100);
    this.documentPartnersService.getByFilter(eventFilter)
      .subscribe(typesview => {
        this.spinner.hide();
        this.listDocumentPartners = typesview.items;
      }, error => {
        this.utils.showErrorMessage(error,'Tipo de produto');
        this.spinner.hide();
        console.log(error);
      });
  }  

prepareDelete(){
  this.modalTitle = 'Exclusão de Produto'
  this.modalBodyDetail = 'Deseja realmente excluir o registro ('+ this.document.title+') ?';
  this.setModalVisible = true;
}

confirmdelete(){

    if (this.document.id !== undefined && this.document.id != '')
    {
       this.spinner.show();
       this.documentTypeService.delete(this.document.id).subscribe((response: any) => {
            this.spinner.hide();
            this.utils.showSuccessMessage(response.message,this.action)
        }, error => {
            this.spinner.hide();
            this.utils.showErrorMessage(error,this.action);
        });
        this.setModalVisible = false;
        this.utils.navigateTo(this.urlReturn,'');
    }

}

canceldelete(){
    this.setToDeleteDocument = '';
    this.modalVisible = false;
}

  redirect(url: string) {
    this.utils.navigateTo(url,'');
  }

  insertDocument(document: DocumentView) {
    this.spinner.show();
    const documentPost = new DocumentPost(document);
      this.documentService.insert(documentPost).subscribe((response: any) =>
       {
        this.spinner.hide();
        this.utils.showSuccessMessage(response.message,this.action);
        this.redirect(this.urlReturn);        
       }, error => {
        this.utils.showErrorMessage(error,this.action);
        this.spinner.hide();
    });
  }

  updateDocument(document: DocumentView) {
    this.spinner.show();
    const documentPut = new DocumentPut(document);
    this.documentService.update(documentPut).subscribe((response: any) =>  {
         this.spinner.hide();
         this.utils.showSuccessMessage(response.message,this.action);
         this.redirect(this.urlReturn);        
       }, error => {
        this.utils.showErrorMessage(error,this.action);
         this.spinner.hide();
    });
  }

  deleteDocument(document: DocumentView) {
    this.spinner.show();
    this.documentService.delete(document.id).subscribe((response: any) => 
       {
        this.spinner.hide();
        this.utils.showSuccessMessage(response.message,this.action);
       }, error  => {
        this.utils.showErrorMessage(error,this.action);
        this.spinner.hide();
      });
      this.redirect(this.urlReturn);
  }

  showMessage(value:string){
    const colErrors = document.getElementById("colerror")!;
    var idvAlert = (<HTMLDivElement>document.getElementById("dvAlert"));
    idvAlert.innerHTML =value;
    colErrors.style.display = '';
}

hideMessage(){
    const colErrors = document.getElementById("colerror")!;
    var idvAlert = (<HTMLDivElement>document.getElementById("dvAlert"));
    idvAlert.innerHTML ='';
    colErrors.style.display = 'none';
  } 
}


