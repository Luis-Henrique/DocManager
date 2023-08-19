import { Routes } from '@angular/router';
import { ReportViewComponent } from './models/report-view-component';
import { ReportComponent } from './report.component';

export const ReportRouting: Routes = [
    {
        path: '',
        component: ReportViewComponent,
        children: [
            {
                path: 'report',
                component: ReportComponent,
                data: { name: 'Gerar relatório', title: 'Gerar relatório' },
            }
        ]
    },
];