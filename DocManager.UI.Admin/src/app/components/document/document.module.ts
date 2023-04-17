// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentRoutes } from 'src/app/components/document/document.routing'
import { DocumentComponent } from './document.component';
import { DocumentViewComponent } from './models/document-view-component';

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
import { DocumentTypeService } from 'src/app/services/Document-type-service';
import { DocumentMaintenanceComponent } from './document-maintenance/document-maintenance.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CustomModalModule } from '../modal/custom-modal.module';
import { Utils } from 'src/app/utils/utils';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DocumentRoutes),
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
    PagerService, Utils
  ],
  declarations: [
    DocumentComponent,
    DocumentMaintenanceComponent,
    DocumentViewComponent,
  ]
})
export class DocumentModule { }
