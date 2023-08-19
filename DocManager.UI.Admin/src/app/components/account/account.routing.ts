import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';

export const AccountRoutes: Routes = [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
    },
    {
      path: 'recovery',
      component: RecoveryComponent,
    },    
    {
      path: 'reset',
      component: ResetComponent,
    },    
];