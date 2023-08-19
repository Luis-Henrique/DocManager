import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/account/register/register.component';
import { DefaultLayoutComponent } from './containers';
import {LoginComponent} from './components/account/login/login.component'
import { RecoveryComponent } from './components/account/recovery/recovery.component';
import { ResetComponent } from './components/account/reset/reset.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
              {
                path:'account',
                loadChildren: () =>
                import('./components/account/account.module').then((m) => m.AccountModule)
              },
              {
                path:'dashboard',
                loadChildren: () =>
                import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule)
              },
              {
                path:'documenttype',
                loadChildren: () =>
                import('./components/document-type/document-type.module').then((m) => m.DocumentTypeModule)
              },
              {
                path:'documentpartners',
                loadChildren: () =>
                import('./components/document-partners/document-partners.module').then((m) => m.DocumentPartnersModule)
              },
              {
                path:'report',
                loadChildren: () =>
                import('./components/report/report.module').then((m) => m.ReportModule)
              },
              {
                path:'document',
                loadChildren: () =>
                import('./components/document/document.module').then((m) => m.DocumentModule)
              },
              {
                path:'user',
                loadChildren: () =>
                import('./components/user/user.module').then((m) => m.UserModule)
              },
              {
                path:'groupautorization',
                loadChildren: () =>
                import('./components/group-autorization/group-autorization.module').then((m) => m.GroupAutorizationModule)
              }                  
    ]
  },
  {
    path:'register',
    component: RegisterComponent,
    data:{
      title:'Register Page'
    }
  },
  {
    path:'recovery',
    component: RecoveryComponent,
    data:{
      title:'recovery Page'
    }
  },  
  {
    path:'login',
    component: LoginComponent,
    data:{
      title:'login Page'
    }
  },
  {
    path:'reset',
    component: ResetComponent,
    data:{
      title:'reset Page'
    }
  },  
  //{path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
