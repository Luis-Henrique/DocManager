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
                   data: {name: 'Pesquisar documento', title:'Pesquisar documento'}
               },
               {
                   path: 'maintenance',
                   component: DocumentTypeMaintenanceComponent,
                   data: {name: 'Inserir documento', title:'Inserir documento'}
               },
               {
                   path: 'maintenance/:id',
                   component: DocumentTypeMaintenanceComponent,
                   data: {name: 'Alterar documento', title:'Alterar documento'}
               },                           
              ]
    }
];