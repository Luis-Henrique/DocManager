import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account-service';
import { Utils } from 'src/app/utils/utils';
import { UserView } from '../models/user-view'
import { UserPut } from '../models/user-put'
import { GroupAutorizationView } from '../../group-autorization/models/group-autorization-view';
import { GroupAutorizationService } from 'src/app/services/group-autorization-service';

@Component({
  selector: 'app-user-maintenance',
  templateUrl: './user-maintenance.component.html'
})

export class UserMaintenanceComponent implements OnInit {
  urlReturn = '/user/user';
  action = 'Inserir';
  @Input() id: any = '';
  idDefault = Guid.EMPTY;
  user = new UserView();
  listGroupAutorization: GroupAutorizationView[] = [];
  constructor(private formBuilder: FormBuilder,
    private activedRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private accountService: AccountService,
    private utils: Utils,
    private groupAutorizationService: GroupAutorizationService
  ) { }

  formUser = new FormGroup({
    id: this.formBuilder.control(this.user.id),
    userAutorization: this.formBuilder.control(this.user.userAutorization),
    userGroupAutorization: this.formBuilder.control(this.user.userGroupAutorization),
    active: this.formBuilder.control(this.user.active),
  });

  ngOnInit() {
    this.getGroupAutorization();
    this.id = this.activedRouter.snapshot.params['id'];
    if (this.id != undefined && this.id != this.idDefault && this.id != null) {
      this.action = 'Alterar';
      this.getById(this.id);
    } else {
        this.utils.showErrorMessage("Algo deu errado!", "");
    }
  }

  getById(id: string) {
    this.spinner.show();
    this.accountService.getByID(id).subscribe(view => {
      this.user = view;
      this.updateForm(this.user);
      this.spinner.hide();
    }, error => {
      this.utils.showErrorMessage(error, this.action)
      this.spinner.hide();
    });
  }

  updateForm(user: UserView) {
    this.formUser = new FormGroup({
        id: this.formBuilder.control(user.id),
        userAutorization: this.formBuilder.control(user.userAutorization),
        userGroupAutorization: this.formBuilder.control(user.userGroupAutorization),
        active: this.formBuilder.control(user.active),
    });
  }

  saveChanges(user: any) {
    if (this.user.id === undefined || this.user.id === '') {
      this.utils.showErrorMessage("Algo deu errado!", "");
    } else {
      this.updateDocumentType(user);
    }
  }

  updateDocumentType(user: UserView) {
    var userAutorization = parseInt(this.utils.getUserAutorization((localStorage.getItem('currentUser') || "")).toString());
    if(userAutorization == 3){
        const userPut = new UserPut(user);
        this.spinner.show();
        this.accountService.updateAccount(userPut).subscribe((response: any) => {
          this.spinner.hide();
          this.utils.showSuccessMessage(response.message, this.action)
          this.redirect(this.urlReturn);
        }, error => {
          this.spinner.hide();
          this.utils.showErrorMessage(error, this.action);
        });
    }
    else
    {
      this.utils.showErrorMessage("Seu usuário não permite essa ação...", 'Usuário não autorizado');
    }  
  }

  getGroupAutorization() {
    this.spinner.show();
    this.groupAutorizationService.getAll()
      .subscribe(typesview => {
        this.spinner.hide();
        var view = new GroupAutorizationView();
        typesview.items.unshift(view);
        this.listGroupAutorization = typesview.items;
        this.listGroupAutorization.shift();
      }, error => {
        this.utils.showErrorMessage(error, 'Tipo de produto');
        this.spinner.hide();
        console.log(error);
      });
  }

  redirect(url: string) {
    this.utils.navigateTo(url, '');
  }
}

