import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ButtonModule, CardModule, FormModule, GridModule, ToastModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import {AccountRoutes} from './account.routing'

@NgModule({
    declarations:[
        RegisterComponent,
        LoginComponent,
        RecoveryComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(AccountRoutes),
        CardModule,
        ButtonModule,
        ToastModule,
        GridModule,
        IconModule,
        FormModule,
    ]
})
export class AccountModule {
}