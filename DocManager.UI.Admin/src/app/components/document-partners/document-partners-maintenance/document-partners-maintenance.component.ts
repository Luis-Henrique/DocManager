import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DocumentPartnersView } from '../models/document-partners-view';
import { DocumentPartnersPost } from '../models/document-partners-post'
import { DocumentPartnersPut } from '../models/document-partners-put'
import { Utils } from '../../../utils/utils';
import { DocumentPartnersService } from '../../../services/document-partners-service';

@Component({
  selector: 'app-document-partners-maintenance',
  templateUrl: './document-partners-maintenance.component.html'
})

export class DocumentPartnersMaintenanceComponent implements OnInit {
  returnUrl: string = '/documentpartners/documentpartners';
  @Input() modalTitle = ''
  @Input() modalBodyDetail = ''
  action = 'Inserir';
  @Input() id: any = '';
  idDefault = Guid.EMPTY;

  public setModalVisible = false;
  documentPartners = new DocumentPartnersView();
  constructor(private formBuilder: FormBuilder,
    private activedRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private documentPartnersService: DocumentPartnersService,
    private utils: Utils
  ) { }

  formDocumentPartners = new FormGroup({
    id: this.formBuilder.control(this.documentPartners.id),
    name: this.formBuilder.control(this.documentPartners.name),
    description: this.formBuilder.control(this.documentPartners.description),
    active: this.formBuilder.control(this.documentPartners.active)
  });

  ngOnInit() {
    this.id = this.activedRouter.snapshot.params['id'];
    if (this.id != undefined && this.id != this.idDefault && this.id != null) {
      this.action = 'Alterar';
      this.getById(this.id);
    } else {
      this.action = 'Inserir';
      this.documentPartners = new DocumentPartnersView();
      this.formDocumentPartners.patchValue(this.documentPartners);
    }
  }

  redirect(url: string) {
    this.utils.navigateTo(url, '');
  }

  getById(id: string) {
    this.spinner.show();
    this.documentPartnersService.getByID(id).subscribe(view => {
      this.documentPartners = view;
      this.updateForm(this.documentPartners);
      this.spinner.hide();
    }, error => {
      this.utils.showErrorMessage(error, this.action)
      this.spinner.hide();
    });
  }

  updateForm(documentPartners: DocumentPartnersView) {
    this.formDocumentPartners = new FormGroup({
      id: this.formBuilder.control(documentPartners.id),
      name: this.formBuilder.control(documentPartners.name),
      description: this.formBuilder.control(documentPartners.description),
      active: this.formBuilder.control(documentPartners.active),
    });
  }

  confirmdelete() {
    var userAutorization = parseInt(this.utils.getUserAutorization((localStorage.getItem('currentUser') || "")).toString());
    if (userAutorization == 1 || userAutorization == 3) {
      if (this.documentPartners.id !== undefined && this.documentPartners.id != '') {
        this.spinner.show();
        this.documentPartnersService.delete(this.documentPartners.id).subscribe((response: any) => {
          this.spinner.hide();
          this.utils.showSuccessMessage(response.message, this.action)
        }, error => {
          this.spinner.hide();
          this.utils.showErrorMessage(error, this.action);
        });
        this.setModalVisible = false;
        this.utils.navigateTo(this.returnUrl, '');
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
    if(this.id == undefined){
      this.utils.showErrorMessage("Não foi possível excluir o item", 'Erro');
    }else{
    this.modalTitle = 'Exclusão'
    this.modalBodyDetail = 'Deseja realmente excluir o registro (' + this.documentPartners.name + ') ?';
    this.setModalVisible = true;
    }
  }

  saveChanges(documentPartners: any) {
    if (this.documentPartners.id === undefined || this.documentPartners.id === '') {
      this.insertDocumentPartners(documentPartners);
    } else {
      this.updateDocumentPartners(documentPartners);
    }
  }

  insertDocumentPartners(documentPartners: DocumentPartnersView) {
    var userAutorization = parseInt(this.utils.getUserAutorization((localStorage.getItem('currentUser') || "")).toString());
    if (userAutorization == 1 || userAutorization == 3) {
      const documentPartnersPost = new DocumentPartnersPost(documentPartners);
      this.spinner.show();
      this.documentPartnersService.insert(documentPartnersPost).subscribe((response: any) => {
        this.spinner.hide();
        this.utils.showSuccessMessage(response.message, this.action)
        this.redirect(this.returnUrl);
      }, error => {
        this.spinner.hide();
        this.utils.showErrorMessage(error, this.action);
      });
    }
    else {
      this.utils.showErrorMessage("Seu usuário não permite essa ação...", 'Usuário não autorizado');
    }

  }

  updateDocumentPartners(documentPartners: DocumentPartnersView) {
    var userAutorization = parseInt(this.utils.getUserAutorization((localStorage.getItem('currentUser') || "")).toString());
    if (userAutorization == 1 || userAutorization == 3) {
      const documentPartnersPut = new DocumentPartnersPut(documentPartners);
      this.spinner.show();
      this.documentPartnersService.update(documentPartnersPut).subscribe((response: any) => {
        this.spinner.hide();
        this.utils.showSuccessMessage(response.message, this.action)
        this.redirect(this.returnUrl);
      }, error => {
        this.spinner.hide();
        this.utils.showErrorMessage(error, this.action);
      });
    }
    else {
      this.utils.showErrorMessage("Seu usuário não permite essa ação...", 'Usuário não autorizado');
    }
  }
}

