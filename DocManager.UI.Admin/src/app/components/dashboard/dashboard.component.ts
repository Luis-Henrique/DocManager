import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DashboardService } from "src/app/services/dashboard-service";
import { PagerService } from "src/app/services/page-service";
import { Utils } from "src/app/utils/utils";
import { DocumentPartnersFilter } from "../document-partners/models/document-partners-filter";
import { DocumentPartnersView } from "../document-partners/models/document-partners-view";
import { DocumentTypeFilter } from "../document-type/models/document-type-filter";
import { DocumentTypeView } from "../document-type/models/documenttype-view";
import { DocumentFilter } from "../document/models/document-filter";
import { DashBoardGroupView } from "./models/dashboard-view";
import { DocumentTypeService } from 'src/app/services/document-type-service';
import { DocumentPartnersService } from 'src/app/services/document-partners-service';
import { DocumentService } from '../../services/document-service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private DocumentService: DocumentService,
    private DocumentPartnersService: DocumentPartnersService,
    private DocumentTypeService: DocumentTypeService,
    private pagerService: PagerService,
    private spinner: NgxSpinnerService,
    private utils: Utils

  ) {

  }

  public amountOfDocumentChartData: number[] = [];
  public amountOfDocumentChartLabels: string[] = [];
  public amountOfPartnersChartData: number[] = [];
  public amountOfPartnersChartLabels: string[] = [];
  public amountOfActiveChartData: number[] = [];
  public amountOfActiveChartLabels: string[] = ["Documentos Ativos", "Documentos Encerrados"];
  public chartColors: any[] = [
    {
      backgroundColor: ["#FF4500", "#FF8C00", "#FFA500", "#FFD700", "#FF0000"]
    }];
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  ngOnInit(): void {
    this.getDocumentTypes();
    this.getDocumentPartners();
    this.filterView(this.formFilter.value, 1);
  }

  saveChanges() {

  }

  private allItems: any[] = [];
  public pager: any = {};

  totalItem: number = 0;
  pagedItems: any[] = [];

  itemsByPage = 10;
  firstPage = 1;
  currentPage = 1;

  listDocumentType: DocumentTypeView[] = [];
  listDocumentPartners: DocumentPartnersView[] = [];

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

  filterView(filter: DocumentFilter, page: number) {
    this.spinner.show();
    let eventFilter = new DocumentFilter(filter.title, filter.description, filter.documentTypeId, filter.documentPartnersId, filter.active, page, this.itemsByPage);
    this.DocumentService.getByFilter(eventFilter).subscribe(view => {
      this.allItems = view.items;
      this.totalItem = view._total;
      this.pager = this.pagerService.getPager(this.totalItem, page, view._pageSize);
      this.pagedItems = this.allItems;
      this.currentPage = page;
      this.setAmountOfDocumentChart();
      this.setAmountOfPartnersChart();
      this.setAmountOfActiveChart();
      this.setLineChart();
      this.spinner.hide();
    }, error => {
      this.utils.showErrorMessage(error, 'Pesquisar');
      console.log(error);
      this.spinner.hide();
    });
  }

  setLineChart() {
    /*
    for(let document of this.allItems){
      var data = new Date(document.validity);
      if(data ==){
      }
    }*/
  }

  setAmountOfActiveChart() {
    var x = 0;
    var y = 0;
    for (let document of this.allItems) {
      if (document.active == true) {
        x++;
      } else {
        y++;
      }
    }
    this.amountOfActiveChartData.push(x);
    this.amountOfActiveChartData.push(y);
  }

  setAmountOfPartnersChart() {
    for (let documentPartners of this.listDocumentPartners) {
      this.amountOfPartnersChartLabels.push(documentPartners.name)
    }
    var x = 0;
    for (let document of this.allItems) {
      x = 0;
      for (let documentPartners of this.listDocumentPartners) {
        if (document.documentPartnersId == documentPartners.id) {
          x++;
        }
      }
      this.amountOfPartnersChartData.push(x);
    }
  }

  setAmountOfDocumentChart() {
    for (let documentType of this.listDocumentType) {
      this.amountOfDocumentChartLabels.push(documentType.name)
    }
    var x = 0;
    for (let documentType of this.listDocumentType) {
      x = 0;
      for (let document of this.allItems) {
        if (document.documentTypeId == documentType.id) {
          x++;
        }
      }
      this.amountOfDocumentChartData.push(x);
    }

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

}