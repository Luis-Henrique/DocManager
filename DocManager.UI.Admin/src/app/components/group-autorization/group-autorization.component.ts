import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GroupAutorizationService } from '../../services/group-autorization-service';
import { PagerService } from '../../services/page-service';
import { Utils } from '../../utils/utils';

@Component({
    selector: 'app-group-autorization',
    templateUrl: './group-autorization.component.html'
})

export class GroupAutorizationComponent implements OnInit {

    returnUrl: string = '';
    @Input() modalBodyDetail = '';
    @Input() modalTitle = '';
    public setModalVisible = false;
    public deleteId = '';

    @Input() id: any = '';

    public pager: any = {};
    pagedItems: any[] = [];
    firstPage = 1;
    itemsByPage = 10;

    constructor(
        private formbuilder: FormBuilder,
        private groupAutorizationService: GroupAutorizationService,
        private spinner: NgxSpinnerService,
        private pagerService: PagerService,
        private utils: Utils
    ) {

    }

    ngOnInit() {
        this.filterView()
    }

    confirmdelete() {
        if(this.deleteId == '0e1250d0-328f-4c93-b9d9-ddf5484bd037'){
            this.utils.showErrorMessage("Você não pode excluir esse registro...", 'Usuário não autorizado');
            this.setModalVisible = false;
        }
        else
        {
            var userAutorization = parseInt(this.utils.getUserAutorization((localStorage.getItem('currentUser') || "")).toString());
            if (userAutorization == 1 || userAutorization == 3) {
                if (this.deleteId !== undefined && this.deleteId != '') {
                    this.spinner.show();
                    this.groupAutorizationService.delete(this.deleteId).subscribe((response: any) => {
                        this.spinner.hide();
                        this.utils.showSuccessMessage(response.message, 'Registro Excluido com sucesso')
                    }, error => {
                        this.spinner.hide();
                        this.utils.showErrorMessage(error, 'Registro não foi Excluido');
                    });
                    this.deleteId == '';
                    this.setModalVisible = false;
                    this.filterView();
                }
            }
            else {
                this.setModalVisible = false;
                this.utils.showErrorMessage("Seu usuário não permite essa ação...", 'Usuário não autorizado');
            }
        }
    }

    canceldelete() {
        this.setModalVisible = false;
    }

    prepareDelete(id: string, name: string) {
        this.deleteId = id;
        this.modalTitle = 'Exclusão';
        this.modalBodyDetail = 'Deseja realmente excluir o registro (' + name + ') ?';
        this.setModalVisible = !this.setModalVisible;
    }

    redirectUpdate(url: string, id: string) {
        this.utils.navigateTo(url, id);
    }

    redirectTo(url: string) {
        this.utils.navigateTo(url, '')
    }

    filterView() {
        this.spinner.show();
        this.groupAutorizationService.getAll().subscribe(view => {
            this.pagedItems = view.items;
            this.pager = this.pagerService.getPager(view._total, 1, 1000);
            this.spinner.hide();
        }, error => {
            this.spinner.hide();
            this.utils.showErrorMessage(error, '');
        });
    }
}