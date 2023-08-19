import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { AccountView } from '../components/account/models/account-view';
import { ServiceBase} from '../service-base/service-base';

@Injectable()
export class AccountService extends ServiceBase<AccountView>{
    constructor(){
        super({
               endpoint: `${environment.url_login}`
              }
            )
    }
}