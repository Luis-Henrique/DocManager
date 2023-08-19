import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountRegister } from '../models/account-register-view';
import {AccountService} from 'src/app/services/account-service';

@Component({
selector:'app-register',
templateUrl:'./register.component.html'
})

export class RegisterComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private accountService: AccountService
                ){}
                
    ngOnInit(){
    }


    createAccount(){
        
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

        if (iUserName.length < 10)
        {
            this.showMessage('Nome muito curto, verifique...');
            return;
        }

        if (iEmail == '' || iEmail == undefined)
        {
            this.showMessage('É necessário informar um e-mail, verifique...');
            return;
        }       

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(iEmail))){
            this.showMessage('É necessário informar um e-mail valido, verifique...');
            return;
        }

        if (iPassword == '' || iPassword == undefined)
        {
            this.showMessage('É necessário informar uma senha, verifique...');
            return;
        }  
        
        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(iPassword))){
            this.showMessage('A senha deve conter 8 caracteres entre maiúsculas, números e especiais, verifique...');
            return;
        }

        if (iPasswordConfirm == '' || iPasswordConfirm == undefined)
        {
            this.showMessage('É necessário informar uma senha de confirmação, verifique...');
            return;
        }     
        

        if (iPassword != iPasswordConfirm)
        {
            this.showMessage('As senhas não conferem, verifique...');
            return;
        }        
        
        console.log('tudo certo, vamos preparar para chamar o backEnd');

        const account = new AccountRegister(iUserName,iEmail,iPassword);

        this.accountService.createAccount(account).subscribe(
        (response:any) => {
            console.log(`tudo certo: ${JSON.stringify(response)}`);
            this.router.navigateByUrl('/login');
        }, error => {
            console.log(`tudo errado ${error}`);
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
