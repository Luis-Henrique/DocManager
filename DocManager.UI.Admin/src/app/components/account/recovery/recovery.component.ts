import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AccountService} from 'src/app/services/account-service';
import {AccountPutRequest} from '../models/account-put-request';

@Component({
selector:'app-recovery',
templateUrl:'./recovery.component.html'
})

export class RecoveryComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private accountService: AccountService
                ){}
                
    ngOnInit(){
    }

    recoveryAccount() {
   
        this.hideMessage();
        var iUserName = (<HTMLInputElement>document.getElementById("username")).value;
        var iEmail = (<HTMLInputElement>document.getElementById("email")).value;
        var iPassword = (<HTMLInputElement>document.getElementById("password")).value;
        var iPasswordConfirm = (<HTMLInputElement>document.getElementById("passwordConfirm")).value;        

        if (iUserName == '' || iUserName == undefined)
        {
            this.showMessage('É necessário informar um usuário, verifique...');
            return;
        }

        if (iEmail == '' || iEmail == undefined)
        {
            this.showMessage('É necessário informar um e-mail, verifique...');
            return;
        }       
        
        if (iPassword == '' || iPassword == undefined)
        {
            this.showMessage('É necessário informar uma senha, verifique...');
            return;
        }          

        if (iPasswordConfirm == '' || iPasswordConfirm == undefined)
        {
            this.showMessage('É necessário informar uma senha de confirmação, verifique...');
            return;
        }                  

        if (iPassword != iPasswordConfirm)
        {
            this.showMessage('Senhas invalidas, verifique...');
            return;
        }
        console.log('tudo certo, vamos preparar para chamar o backEnd');

        const account = new AccountPutRequest(iUserName,iEmail,iPassword);

        this.accountService.recoveryAccount(account).subscribe(
        (response:any) => {
            console.log(`tudo certo: ${JSON.stringify(response)}`);
            this.router.navigateByUrl('/login');
        }, error => {
            console.log(`tudo errado ${error}`);
            this.showMessage('Login ou senha inválidos, verifique...');
        });
    }

    showMessage(value:string){
        const colErrors = document.getElementById("colerror")!;
        var idvAlert = (<HTMLDivElement>document.getElementById("dvAlert"));
        idvAlert.innerHTML =value;
        colErrors.style.display = '';
    }

    hideMessage(){
        const colErrors = document.getElementById("colerror")!;
        var idvAlert = (<HTMLDivElement>document.getElementById("dvAlert"));
        idvAlert.innerHTML ='';
        colErrors.style.display = 'none';
      }  

}