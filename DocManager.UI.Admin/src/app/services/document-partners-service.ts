import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { DocumentPartnersView } from '../components/document-partners/models/document-partners-view';
import { ServiceBase} from '../service-base/service-base';

@Injectable()
export class DocumentPartnersService extends ServiceBase<DocumentPartnersView>{
    constructor(){
        super({
               endpoint: `${environment.url_api}documentpartners`
              }
            )
    }
}