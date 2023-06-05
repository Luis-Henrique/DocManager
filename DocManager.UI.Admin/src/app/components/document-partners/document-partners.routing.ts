import {Routes} from '@angular/router'
import { DocumentPartnersComponent } from './document-partners.component';
import { DocumentPartnersViewComponent } from './models/document-partners-view-component';
import { DocumentPartnersMaintenanceComponent } from './document-partners-maintenance/document-partners-maintenance.component';

export const DocumentPartnersRoutes: Routes = [
  {
    path: '',
    component: DocumentPartnersViewComponent,
    children: [
               {
                   path: 'documentpartners',
                   component: DocumentPartnersComponent,
                   data: {name: 'Pesquisar parceiro', title:'Pesquisar parceiro'}
               },
               {
                   path: 'maintenance',
                   component: DocumentPartnersMaintenanceComponent,
                   data: {name: 'Inserir parceiro', title:'Inserir parceiro'}
               },
               {
                   path: 'maintenance/:id',
                   component: DocumentPartnersMaintenanceComponent,
                   data: {name: 'Alterar parceiro', title:'Alterar parceiro'}
               },                           
              ]
    }
];

