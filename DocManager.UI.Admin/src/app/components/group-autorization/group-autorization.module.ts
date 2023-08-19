import { CommonModule } from '@angular/common';
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
import { GroupAutorizationComponent } from './group-autorization.component';
import { GroupAutorizationMaintenanceComponent } from './group-autorization-maintenance/group-autorization-maintenance.component';
import { GroupAutorizationViewComponent } from './models/group-autorization-view.component';
import { GroupAutorizationRoutes } from './group-autorization.routing';
import { GroupAutorizationService } from '../../services/group-autorization-service';
import { PagerService } from '../../services/page-service';
import { Utils } from '../../utils/utils';

@NgModule({
    imports:[
        RouterModule.forChild(GroupAutorizationRoutes),
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
        GroupAutorizationService,
        PagerService,
        Utils,
    ],
    declarations:[
        GroupAutorizationComponent,
        GroupAutorizationMaintenanceComponent,
        GroupAutorizationViewComponent
    ],
})
export class GroupAutorizationModule {
}