import { Routes } from '@angular/router';
import { DocumentViewComponent } from './models/document-view-component';
import { DocumentMaintenanceComponent } from './document-maintenance/document-maintenance.component';
import { DocumentComponent } from './document.component';


export const DocumentRoutes: Routes = [
  {
    path: '',
    component: DocumentViewComponent,
    children: [
      {
        path: 'document',
        component: DocumentComponent,
        data: { name: 'Pesquisar documento', title: 'Pesquisar documento' },
      },
      {
        path: 'maintenance',
        component: DocumentMaintenanceComponent,
        data: { name: 'Inserir documento', title: 'Inserir documento' },
      },
      {
        path: 'maintenance/:id',
        component: DocumentMaintenanceComponent,
        data: { name: 'Alterar documento', title: 'Alterar documento' },
      }
    ]
  },
];