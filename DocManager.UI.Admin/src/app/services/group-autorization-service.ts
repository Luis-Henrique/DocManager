import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { DocumentView } from '../components/document/models/document-view';
import { GroupAutorizationView } from '../components/group-autorization/models/group-autorization-view';
import { ServiceBase} from '../service-base/service-base';

@Injectable()
export class GroupAutorizationService extends ServiceBase<GroupAutorizationView>{
    constructor(){
        super({
               endpoint: `${environment.url_api}groupAutorization`
              }
            )
    }
}