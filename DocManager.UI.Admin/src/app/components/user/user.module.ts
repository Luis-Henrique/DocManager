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
import { PagerService } from '../../services/page-service';
import { CustomPaginationModule } from '../pagination/custom-pagination.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CustomModalModule } from '../modal/custom-modal.module';
import { UserMaintenanceComponent } from './user-maintenance/user-maintenance.compoent';
import { UserComponent } from './user.component';
import { UserRouting } from './user.routing';
import { Utils } from '../../utils/utils';
import { AccountService } from 'src/app/services/account-service';
import { UserViewComponent } from './models/user-view.component';
import { GroupAutorizationService } from 'src/app/services/group-autorization-service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRouting),
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
        AccountService,
        GroupAutorizationService,
        DatePipe,
        PagerService, Utils
    ],
    declarations: [
        UserComponent,
        UserMaintenanceComponent,
        UserViewComponent
    ]
})
export class UserModule { }


