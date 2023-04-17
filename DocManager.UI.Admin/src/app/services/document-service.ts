import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { DocumentView } from '../components/document/models/document-view';
import { ServiceBase} from '../service-base/service-base';

@Injectable()
export class DocumentService extends ServiceBase<DocumentView>{
    constructor(){
        super({
               endpoint: `${environment.url_api}document`
              }
            )
    }
}