import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AccountService} from 'src/app/services/account-service';
import { Utils } from 'src/app/utils/utils';
import {AccountPutRequest} from '../models/account-put-request';

@Component({
selector:'app-recovery',
templateUrl:'./recovery.component.html'
})

export class RecoveryComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private accountService: AccountService,
                ){}
                
    ngOnInit(){
    }

    recoveryAccount() {
        var iEmail = (<HTMLInputElement>document.getElementById("email")).value;

        this.validateForm(iEmail);

        this.accountService.sendResetPasswordLink(iEmail)
        .subscribe((response:any) => {
            this.router.navigateByUrl('/login');
        }, error => {
            console.log(`erro ao enviar email ${error}`);
            this.showMessage('Erro ao enviar e-mail, tente novamente...');
        });

        
    }

    validateForm(email:string){
        if (email == '' || email == undefined)
        {
            this.showMessage('É necessário informar um e-mail, verifique...');
            return;
        }       
        
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            this.showMessage('É necessário informar um e-mail valido, verifique...');
            return;
        }
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