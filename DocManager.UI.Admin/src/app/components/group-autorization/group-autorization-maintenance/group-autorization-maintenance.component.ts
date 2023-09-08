import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GroupAutorizationService } from '../../../services/group-autorization-service';
import { Utils } from '../../../utils/utils';
import { GroupAutoriozationPost } from '../models/group-autorization-post';
import { GroupAutorizationPut } from '../models/group-autorization-put';
import { GroupAutorizationView } from '../models/group-autorization-view';


@Component({
  selector: 'app-group-autorization-maintenance',
  templateUrl: './group-autorization-maintenance.component.html'
})

export class GroupAutorizationMaintenanceComponent implements OnInit {
  urlReturn = '/groupautorization/groupautorization';
  @Input() modalTitle = ''
  public modalVisible = false;
  setToDeleteDocument = '';
  @Input() modalBodyDetail = ''
  action = 'Inserir';
  @Input() id: any = '';
  idDefault = Guid.EMPTY;

  public setModalVisible = false;
  groupAutorization = new GroupAutorizationView();
  constructor(private formBuilder: FormBuilder,
    private activedRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private groupAutorizationService: GroupAutorizationService,
    private utils: Utils
  ) { }

  formDocumentType = new FormGroup({
    id: this.formBuilder.control(this.groupAutorization.id),
    name: this.formBuilder.control(this.groupAutorization.name),
    active: this.formBuilder.control(this.groupAutorization.active)
  });

  ngOnInit() {
    this.id = this.activedRouter.snapshot.params['id'];
    if (this.id != undefined && this.id != this.idDefault && this.id != null) {
      this.action = 'Alterar';
      this.getById(this.id);
    } else {
      this.action = 'Inserir';
      this.groupAutorization = new GroupAutorizationView();
      this.formDocumentType.patchValue(this.groupAutorization);
    }
  }

  getById(id: string) {
    this.spinner.show();
    this.groupAutorizationService.getByID(id).subscribe(view => {
      this.groupAutorization = view;
      this.updateForm(this.groupAutorization);
      this.spinner.hide();
    }, error => {
      this.utils.showErrorMessage(error, this.action)
      this.spinner.hide();
    });
  }

  updateForm(groupAutorization: GroupAutorizationView) {
    this.formDocumentType = new FormGroup({
      id: this.formBuilder.control(groupAutorization.id),
      name: this.formBuilder.control(groupAutorization.name),
      active: this.formBuilder.control(groupAutorization.active),
    });
  }

  confirmdelete() {
    if(this.groupAutorization.id == '0e1250d0-328f-4c93-b9d9-ddf5484bd037'){
      this.utils.showErrorMessage("Você não pode excluir esse registro...", 'Usuário não autorizado');
      this.setModalVisible = false;
    }
    else
    {
      var userAutorization = parseInt(this.utils.getUserAutorization((localStorage.getItem('currentUser') || "")).toString());
      if (userAutorization == 1 || userAutorization == 3) {
        if (this.groupAutorization.id !== undefined && this.groupAutorization.id != '') {
          this.spinner.show();
          this.groupAutorizationService.delete(this.groupAutorization.id).subscribe((response: any) => {
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
  }

  canceldelete() {
    this.setToDeleteDocument = '';
    this.modalVisible = false;
    this.setModalVisible = false;
  }

  prepareDelete() {
    if(this.id == undefined){
      this.utils.showErrorMessage("Não foi possível excluir o item", 'Erro');
    }else{
    this.modalTitle = 'Exclusão'
    this.modalBodyDetail = 'Deseja realmente excluir o registro (' + this.groupAutorization.name + ') ?';
    this.setModalVisible = true;
    }
  }

  saveChanges(groupAutorization: any) {
    if (this.groupAutorization.id === undefined || this.groupAutorization.id === '') {
      this.insertDocumentType(groupAutorization);
    } else {
      this.updateDocumentType(groupAutorization);
    }
  }

  insertDocumentType(groupAutorization: GroupAutorizationView) {
    var userAutorization = parseInt(this.utils.getUserAutorization((localStorage.getItem('currentUser') || "")).toString());
    if (userAutorization == 1 || userAutorization == 3) {
      const groupAutoriozationPost = new GroupAutoriozationPost(groupAutorization);
      this.spinner.show();
      this.groupAutorizationService.insert(groupAutoriozationPost).subscribe((response: any) => {
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

  updateDocumentType(groupAutorization: GroupAutorizationView) {
    if(groupAutorization.id == '0e1250d0-328f-4c93-b9d9-ddf5484bd037'){
      this.utils.showErrorMessage("Você não pode editar esse registro...", 'Usuário não autorizado');
      this.setModalVisible = false;
    }
    else
    {
      var userAutorization = parseInt(this.utils.getUserAutorization((localStorage.getItem('currentUser') || "")).toString());
      if (userAutorization == 1 || userAutorization == 3) {
        const groupAutoriozationPut = new GroupAutorizationPut(groupAutorization);
        this.spinner.show();
        this.groupAutorizationService.update(groupAutoriozationPut).subscribe((response: any) => {
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
  }

  redirect(url: string) {
    this.utils.navigateTo(url, '');
  }
}

