import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  ModalModule,
  NavModule,
  ProgressModule,
  SharedModule,
  TableModule,
  TabsModule,
  ToastModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRoute } from './dashboard.routing';
import { DashboardService } from 'src/app/services/dashboard-service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CustomModalModule } from '../modal/custom-modal.module';
import { DocumentService } from 'src/app/services/document-service';
import { DocumentTypeService } from 'src/app/services/Document-type-service';
import { DocumentPartnersService } from 'src/app/services/document-partners-service';
import { PagerService } from 'src/app/services/page-service';
import { Utils } from 'src/app/utils/utils';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CardModule,
    RouterModule.forChild(DashboardRoute),
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    FormsModule,
    SharedModule,
    ListGroupModule,
    DropdownModule,
    NgxSpinnerModule,
    ModalModule,
    CurrencyMaskModule,
    ToastModule,
    CustomModalModule,
    ChartsModule
  ],
  declarations: [DashboardComponent],
  providers:[
    DashboardService,
    DocumentService,
    DocumentTypeService,
    DocumentPartnersService,
    DatePipe,
    PagerService, Utils
],
})
export class DashboardModule {
}
