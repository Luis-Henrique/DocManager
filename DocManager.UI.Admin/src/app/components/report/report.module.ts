// Angular
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    ModalModule,
    PaginationModule,
    SharedModule,
    TableModule,
    ToastModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { DocumentService } from '../../services/document-service';
import { PagerService } from '../../services/page-service';
import { CustomPaginationModule } from '../pagination/custom-pagination.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CustomModalModule } from '../modal/custom-modal.module';
import { ReportRouting } from './report.routing';
import { ReportComponent } from './report.component';
import { ReportViewComponent } from './models/report-view-component';
import { Utils } from '../../utils/utils';
import { DocumentTypeService } from 'src/app/services/document-type-service';
import { DocumentPartnersService } from 'src/app/services/document-partners-service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ReportRouting),
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
        CurrencyMaskModule,
        ToastModule,
        CustomModalModule
    ],
    providers: [
        DocumentService,
        DocumentTypeService,
        DocumentPartnersService,
        DatePipe,
        PagerService, Utils
    ],
    declarations: [
        ReportComponent,
        ReportViewComponent
    ]
})
export class ReportModule { }

