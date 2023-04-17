import { Injectable} from '@angular/core';
import { environment } from '../../environments/environment';
import { AccountLoginView } from '../components/account/models/account-login-view';
import { ServiceBase} from '../service-base/service-base';

@Injectable()
export class AccountService extends ServiceBase<AccountLoginView>{
    constructor(){
        super({
               endpoint: `${environment.url_login}`
              }
            )
    }
}