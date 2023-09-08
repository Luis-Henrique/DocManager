import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentService } from '../../services/document-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PagerService } from '../../services/page-service';
import { Utils } from 'src/app/utils/utils';
import { DocumentTypeService } from 'src/app/services/document-type-service';
import { DocumentPartnersService } from 'src/app/services/document-partners-service';
import { DocumentTypeView } from '../document-type/models/documenttype-view';
import { DocumentPartnersView } from '../document-partners/models/document-partners-view';
import { DocumentFilter } from '../document/models/document-filter';
import { DocumentTypeFilter } from '../document-type/models/document-type-filter';
import { DocumentPartnersFilter } from '../document-partners/models/document-partners-filter';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {
    @Input() modalTitle = ''
    @Input() modalBodyDetail = ''
    public setModalVisible = false;
    returnUrl: string = '/report/report';
    public deleteId = '';
    constructor(private formBuilder: FormBuilder,
        private DocumentService: DocumentService,
        private DocumentPartnersService: DocumentPartnersService,
        private DocumentTypeService: DocumentTypeService,
        private pagerService: PagerService,
        private spinner: NgxSpinnerService,
        private utils: Utils
    ) {

    }

    private allItems: any[] = [];
    public pager: any = {};

    listDocumentType: DocumentTypeView[] = [];
    listDocumentPartners: DocumentPartnersView[] = [];

    ngOnInit(): void {
        this.InitializeDependecies();
    }

    formFilter = new FormGroup(
        {
            title: this.formBuilder.control(''),
            description: this.formBuilder.control(''),
            active: this.formBuilder.control('todos'),
            documentTypeId: this.formBuilder.control(''),
            documentPartnersId: this.formBuilder.control(''),
            itemsByPage: this.formBuilder.control('10')
        }
    );

    totalItem: number = 0;
    pagedItems: any[] = [];

    itemsByPage = 10;
    firstPage = 1;
    currentPage = 1;

    filterView(filter: DocumentFilter, page: number) {
        this.spinner.show();
        var userGroupAutorization = "Todos";
        if(!(userGroupAutorization == '')){
        let eventFilter = new DocumentFilter('', '', filter.documentTypeId, filter.documentPartnersId, userGroupAutorization, filter.active, 1, 50);
        this.DocumentService.getByFilter(eventFilter).subscribe(view => {
            this.allItems = view.items;
            this.totalItem = view._total;
            this.pager = this.pagerService.getPager(this.totalItem, page, view._pageSize);
            this.pagedItems = this.allItems;
            for(var i=0; i<this.pagedItems.length; i++){
                this.pagedItems[i].validity = this.pagedItems[i].validity.toString().split(' ')[0];
            }
            this.currentPage = page;
            this.spinner.hide();
        }, error => {
            this.utils.showErrorMessage(error, 'Pesquisar');
            console.log(error);
            this.spinner.hide();
        });
        }else{
            this.utils.showErrorMessage('Usuário não pertence a nenhum grupo', 'Erro! fale com o administrador');
        }
    }

    redirectTo(url: string) {
        this.utils.navigateTo(url, '')
    }

    redirectUpdate(url: string, id: string) {
        this.utils.navigateTo(url, id)
    }

    redirectView(url: string) {
        window.open(url, '_blank');
    }

    confirmdelete() {

        if (this.deleteId !== undefined && this.deleteId != '') {

            this.spinner.show();
            this.DocumentService.delete(this.deleteId).subscribe((response: any) => {
                this.spinner.hide();
                this.utils.showSuccessMessage(response.message, 'Sucesso')
            }, error => {
                this.spinner.hide();
                this.utils.showErrorMessage(error, 'Erro');
            });
            this.setModalVisible = false;
            this.deleteId = '';
            this.filterView(this.formFilter.value, 1);
        }

    }

    canceldelete() {
        this.setModalVisible = false;
        this.deleteId = '';
    }

    prepareDelete(id: string, name: string) {

        this.deleteId = id;
        this.modalTitle = 'Excluir tipo de produto';
        this.modalBodyDetail = 'Deseja realmente excluir o registro (' + name + ') ?';
        this.setModalVisible = true;
    }


    getDocumentTypes() {
        this.spinner.show();
        let eventFilter = new DocumentTypeFilter('', '', 'todos', 0, 100);
        this.DocumentTypeService.getByFilter(eventFilter)
            .subscribe(typesview => {
                this.spinner.hide();
                var view = new DocumentTypeView();
                typesview.items.unshift(view);
                this.listDocumentType = typesview.items;
                this.listDocumentType.shift();
            }, error => {
                this.utils.showErrorMessage(error, 'Tipo de produto');
                this.spinner.hide();
                console.log(error);
            });
    }

    getDocumentPartners() {
        this.spinner.show();
        let eventFilter = new DocumentPartnersFilter('', '', 'todos', 0, 100);
        this.DocumentPartnersService.getByFilter(eventFilter)
            .subscribe(typesview => {
                this.spinner.hide();
                var view = new DocumentPartnersView();
                typesview.items.unshift(view);
                this.listDocumentPartners = typesview.items;
                this.listDocumentPartners.shift();
            }, error => {
                this.utils.showErrorMessage(error, 'Tipo de produto');
                this.spinner.hide();
                console.log(error);
            });
    }

    export(): void 
    {
      var table_elt = document.getElementById('table');

      var workbook = XLSX.utils.table_to_book(table_elt);
  
      var ws = workbook.Sheets["items"];
      XLSX.utils.sheet_add_aoa(ws, [["Created "+new Date().toISOString()]], {origin:-1});
  
      XLSX.writeFile(workbook, "Relatorio.xlsb");
    }

    InitializeDependecies() {
        this.getDocumentTypes();
        this.getDocumentPartners();
        this.filterView(this.formFilter.value, 1)
    }

}

