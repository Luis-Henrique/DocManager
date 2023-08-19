import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DocumentTypeService } from 'src/app/services/document-type-service';
import { Utils } from 'src/app/utils/utils';
import { DocumentTypePost } from '../models/document-type-post'
import { DocumentTypePut } from '../models/document-type-put'
import { DocumentTypeView } from '../models/documenttype-view';

@Component({
  selector: 'app-document-type-maintenance',
  templateUrl: './document-type-maintenance.component.html'
})

export class DocumentTypeMaintenanceComponent implements OnInit {
  urlReturn = '/documenttype/documenttype';
  @Input() modalTitle = ''
  @Input() modalBodyDetail = ''
  action = 'Inserir';
  @Input() id: any = '';
  idDefault = Guid.EMPTY;

  public setModalVisible = false;
  documentType = new DocumentTypeView();
  constructor(private formBuilder: FormBuilder,
    private activedRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private documentTypeService: DocumentTypeService,
    private utils: Utils
  ) { }

  formDocumentType = new FormGroup({
    id: this.formBuilder.control(this.documentType.id),
    name: this.formBuilder.control(this.documentType.name),
    description: this.formBuilder.control(this.documentType.description),
    active: this.formBuilder.control(this.documentType.active)
  });

  ngOnInit() {
    this.id = this.activedRouter.snapshot.params['id'];
    if (this.id != undefined && this.id != this.idDefault && this.id != null) {
      this.action = 'Alterar';
      this.getById(this.id);
    } else {
      this.action = 'Inserir';
      this.documentType = new DocumentTypeView();
      this.formDocumentType.patchValue(this.documentType);
    }
  }

  getById(id: string) {
    this.spinner.show();
    this.documentTypeService.getByID(id).subscribe(view => {
      this.documentType = view;
      this.updateForm(this.documentType);
      this.spinner.hide();
    }, error => {
      this.utils.showErrorMessage(error, this.action)
      this.spinner.hide();
    });
  }

  updateForm(documentType: DocumentTypeView) {
    this.formDocumentType = new FormGroup({
      id: this.formBuilder.control(documentType.id),
      name: this.formBuilder.control(documentType.name),
      description: this.formBuilder.control(documentType.description),
      active: this.formBuilder.control(documentType.active),
    });
  }

  confirmdelete() {
    var userAutorization = parseInt(this.utils.getUserAutorization((localStorage.getItem('currentUser') || "")).toString());
    if (userAutorization == 1 || userAutorization == 3) {
      if (this.documentType.id !== undefined && this.documentType.id != '') {
        this.spinner.show();
        this.documentTypeService.delete(this.documentType.id).subscribe((response: any) => {
          this.spinner.hide();
          this.utils.showSuccessMessage(response.message, this.action)
        }, error => {
          this.spinner.hide();
          this.utils.showErrorMessage(error, this.action);
        });
        this.setModalVisible = false;
        this.redirect(this.urlReturn);
      }
    }
    else {
      this.setModalVisible = false;
      this.utils.showErrorMessage("Seu usuário não permite essa ação...", 'Usuário não autorizado');
    }
  }

  canceldelete() {
    this.setModalVisible = false;
  }

  prepareDelete() {
    this.modalTitle = 'Excluir tipo de produto';
    this.modalBodyDetail = 'Deseja realmente excluir o registro (' + this.documentType.name + ') ?';
  }


  saveChanges(documentType: any) {
    if (this.documentType.id === undefined || this.documentType.id === '') {
      this.insertDocumentType(documentType);
    } else {
      this.updateDocumentType(documentType);
    }
  }

  insertDocumentType(documentType: DocumentTypeView) {
    var userAutorization = parseInt(this.utils.getUserAutorization((localStorage.getItem('currentUser') || "")).toString());
    if (userAutorization == 1 || userAutorization == 3) {
      const documentTypePost = new DocumentTypePost(documentType);
      this.spinner.show();
      this.documentTypeService.insert(documentTypePost).subscribe((response: any) => {
        this.spinner.hide();
        this.utils.showSuccessMessage(response.message, this.action)
        this.redirect(this.urlReturn);
      }, error => {
        this.spinner.hide();
        this.utils.showErrorMessage(error, this.action);
      });
    }
    else {
      this.utils.showErrorMessage("Seu usuário não permite essa ação...", 'Usuário não autorizado');
    }

  }

  updateDocumentType(documentType: DocumentTypeView) {
    var userAutorization = parseInt(this.utils.getUserAutorization((localStorage.getItem('currentUser') || "")).toString());
    if (userAutorization == 1 || userAutorization == 3) {
      const documentTypePut = new DocumentTypePut(documentType);
      this.spinner.show();
      this.documentTypeService.update(documentTypePut).subscribe((response: any) => {
        this.spinner.hide();
        this.utils.showSuccessMessage(response.message, this.action)
        this.redirect(this.urlReturn);
      }, error => {
        this.spinner.hide();
        this.utils.showErrorMessage(error, this.action);
      });
    }
    else {
      this.utils.showErrorMessage("Seu usuário não permite essa ação...", 'Usuário não autorizado');
    }
  }

  redirect(url: string) {
    this.utils.navigateTo(url, '');
  }
}

