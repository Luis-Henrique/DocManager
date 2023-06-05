import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { DocumentTypeView } from '../components/document-type/models/documenttype-view';
import { ServiceBase} from '../service-base/service-base';

@Injectable()
export class DocumentTypeService extends ServiceBase<DocumentTypeView>{
    constructor(){
        super({
               endpoint: `${environment.url_api}documenttype`
              }
            )
    }
}