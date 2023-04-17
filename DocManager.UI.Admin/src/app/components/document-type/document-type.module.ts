import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { DocumentTypeMaintenanceComponent } from './document-type-maintenance/document-type-maintenance.component'
import { DocumentTypeComponent } from './document-type.component';
import { DocumentTypeRoutes } from './document-type.routing';
import { DocumentTypeViewComponent } from './models/document-type-view-component';

import {
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    PaginationModule,
    SharedModule,
    TableModule,
    ModalModule,
    ToastModule,
  } from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PagerService } from 'src/app/services/page-service';
import { CustomPaginationModule } from '../pagination/custom-pagination.module';
import { Utils } from 'src/app/utils/utils';
import { CustomModalModule } from '../modal/custom-modal.module';
import { DocumentTypeService } from 'src/app/services/Document-type-service';

@NgModule({
    imports:[
        RouterModule.forChild(DocumentTypeRoutes),
        CommonModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ButtonGroupModule,
        ButtonModule,
        SharedModule,
        CardModule,
        GridModule,
        ListGroupModule,
        DropdownModule,
        IconModule,
        TableModule,
        NgxSpinnerModule,
        PaginationModule,
        CustomPaginationModule,
        ModalModule,
        ToastModule,
        CustomModalModule
    ],
    providers:[
        DocumentTypeService,
        PagerService,
        Utils,
    ],
    declarations:[
        DocumentTypeComponent,
        DocumentTypeMaintenanceComponent,
        DocumentTypeViewComponent
    ],
})
export class DocumentTypeModule {
}