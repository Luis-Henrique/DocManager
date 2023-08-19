import {Routes} from '@angular/router'
import { GroupAutorizationMaintenanceComponent } from './group-autorization-maintenance/group-autorization-maintenance.component';
import { GroupAutorizationComponent } from './group-autorization.component';
import { GroupAutorizationViewComponent } from './models/group-autorization-view.component';

export const GroupAutorizationRoutes: Routes = [
  {
    path: '',
    component: GroupAutorizationViewComponent,
    children: [
               {
                   path: 'groupautorization',
                   component: GroupAutorizationComponent,
                   data: {name: 'Pesquisar tipo do documento', title:'Pesquisar tipo do documento'}
               },
               {
                   path: 'maintenance',
                   component: GroupAutorizationMaintenanceComponent,
                   data: {name: 'Inserir tipo do documento', title:'Inserir tipo do documento'}
               },
               {
                   path: 'maintenance/:id',
                   component: GroupAutorizationMaintenanceComponent,
                   data: {name: 'Alterar tipo do documento', title:'Alterar tipo do documento'}
               },                           
              ]
    }
];