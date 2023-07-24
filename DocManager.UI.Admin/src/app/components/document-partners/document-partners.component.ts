import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentPartnersService } from '../../services/document-partners-service';
import { PagerService } from '../../services/page-service';
import { DocumentPartnersFilter } from './models/document-partners-filter';
import { Utils } from '../../utils/utils';

@Component({
    selector: 'app-document-partners',
    templateUrl: './document-partners.component.html'
})

export class DocumentPartnersComponent implements OnInit {

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
        private documentPartnersService: DocumentPartnersService,
        private spinner: NgxSpinnerService,
        private pagerService: PagerService,
        private utils: Utils
    ) {

    }

    formFilter = new FormGroup({
        name: this.formbuilder.control(''),
        description: this.formbuilder.control(''),
        active: this.formbuilder.control('todos'),
        itemsByPage: this.formbuilder.control('10'),
    });

    ngOnInit() {
        this.filterView(this.formFilter.value, 1)
    }

    confirmdelete() {
        if (this.deleteId !== undefined && this.deleteId != '') {
            this.spinner.show();
            this.documentPartnersService.delete(this.deleteId).subscribe((response: any) => {
                this.spinner.hide();
                this.utils.showSuccessMessage(response.message, 'Categoria')
            }, error => {
                this.spinner.hide();
                this.utils.showErrorMessage(error, 'Exclusão de Categoria');
            });
            this.deleteId == '';
            this.setModalVisible = false;
            this.filterView(this.formFilter.value, 1);
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

    filterView(filter: DocumentPartnersFilter, page: number) {

        let _filter = new DocumentPartnersFilter(filter.name, filter.description, filter.active, page, filter.itemsByPage);
        this.spinner.show();
        this.documentPartnersService.getByFilter(_filter).subscribe(view => {
            this.pagedItems = view.items;
            this.pager = this.pagerService.getPager(view._total, page, view._pageSize);
            this.spinner.hide();
        }, error => {
            this.spinner.hide();
            this.utils.showErrorMessage(error, 'Pesquisar');
        });
    }

}
