import {Routes} from '@angular/router'
import { DocumentTypeComponent } from './document-type.component';
import { DocumentTypeViewComponent } from './models/documenttype-view.component'
import { DocumentTypeMaintenanceComponent } from './document-type-maintenance/document-type-maintenance.component';

export const DocumentTypeRoutes: Routes = [
  {
    path: '',
    component: DocumentTypeViewComponent,
    children: [
               {
                   path: 'documenttype',
                   component: DocumentTypeComponent,
                   data: {name: 'Pesquisar tipo do documento', title:'Pesquisar tipo do documento'}
               },
               {
                   path: 'maintenance',
                   component: DocumentTypeMaintenanceComponent,
                   data: {name: 'Inserir tipo do documento', title:'Inserir tipo do documento'}
               },
               {
                   path: 'maintenance/:id',
                   component: DocumentTypeMaintenanceComponent,
                   data: {name: 'Alterar tipo do documento', title:'Alterar tipo do documento'}
               },                           
              ]
    }
];