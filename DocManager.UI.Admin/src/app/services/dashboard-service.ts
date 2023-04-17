import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { DashBoardGroupView } from '../components/dashboard/models/dashboard-view';

import { ServiceBase} from '../service-base/service-base';

@Injectable()
export class DashboardService extends ServiceBase<DashBoardGroupView>{
    constructor(){
        super({
               endpoint: `${environment.url_api}dashboard`
              }
            )
    }
}