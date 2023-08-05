import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account-service';
import { Utils } from 'src/app/utils/utils';
import { AccountResetView } from '../models/account-reset-view';


@Component({
selector:'app-reset',
templateUrl:'./reset.component.html'
})

export class ResetComponent implements OnInit {

    returnUrl: string ='';
    emailToReset: string ='';
    emailToken: string ='';
    accountReset = new AccountResetView();

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private accountService: AccountService,
                ){}
                
    ngOnInit(){
        this.activatedRoute.queryParams.subscribe(val=>{
            this.emailToReset = val['email'];
            let urlToken = val['code'];

            this.emailToken = urlToken.replace(/ /g,'+');
        })
    }

    reset(){
        var iPassword = (<HTMLInputElement>document.getElementById("new-password")).value;
        var iPasswordConfirm = (<HTMLInputElement>document.getElementById("passwordConfirm")).value;

        if(this.validateForm(iPassword, iPasswordConfirm) == 0){
            this.accountReset.email = this.emailToReset;
            this.accountReset.newPassword = iPassword;
            this.accountReset.confirmPassword = iPasswordConfirm;
            this.accountReset.emailToken = this.emailToken;
    
            this.accountService.resetPassword(this.accountReset).subscribe((response:any) => {
                this.router.navigateByUrl('/login');
            }, error => {
                console.log(`erro ao alterar a senha ${error}`);
                this.showMessage('Erro ao alterar a senha, tente novamente...');
            })
        }
    }

    validateForm(password: string, passwordConfirm: string){
        this.hideMessage()
        if (password == '' || password == undefined)
        {
            this.showMessage('É necessário informar uma senha, verifique...');
            return 1;
        }  
        
        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(password))){
            this.showMessage('A senha deve conter 8 caracteres entre maiúsculas, números e especiais, verifique...');
            return 1;
        }

        if (passwordConfirm == '' || passwordConfirm == undefined)
        {
            this.showMessage('É necessário informar uma senha de confirmação, verifique...');
            return 1;
        }     

        if (password != passwordConfirm)
        {
            this.showMessage('As senhas não conferem, verifique...');
            return 1;
        }    
        return 0;    
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