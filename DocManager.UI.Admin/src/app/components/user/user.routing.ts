import { Routes } from '@angular/router';
import { UserViewComponent } from './models/user-view.component';
import { UserMaintenanceComponent } from './user-maintenance/user-maintenance.compoent';
import { UserComponent } from './user.component';

export const UserRouting: Routes = [
  {
    path: '',
    component: UserViewComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
        data: { name: 'Ativar usuário', title: 'Ativar usuário' },
      },
      {
          path: 'maintenance/:id',
          component: UserMaintenanceComponent,
          data: {name: 'Alterar usuário', title:'Alterar usuário'}
      },  
    ]
  },
];