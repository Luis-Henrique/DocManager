import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentPartnersMaintenanceComponent } from './document-partners-maintenance/document-partners-maintenance.component'
import { DocumentPartnersComponent } from './document-partners.component';
import { DocumentPartnersRoutes } from './document-partners.routing';
import { DocumentPartnersViewComponent } from './models/document-partners-view-component';
import { Utils } from '../../utils/utils';

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
import { CustomPaginationModule } from '../pagination/custom-pagination.module';
import { CustomModalModule } from '../modal/custom-modal.module';
import { DocumentPartnersService } from '../../services/document-partners-service';
import { PagerService } from '../../services/page-service';

@NgModule({
    imports:[
        RouterModule.forChild(DocumentPartnersRoutes),
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
        DocumentPartnersService,
        PagerService,
        Utils,
    ],
    declarations:[
        DocumentPartnersComponent,
        DocumentPartnersMaintenanceComponent,
        DocumentPartnersViewComponent
    ],
})
export class DocumentPartnersModule {
}
