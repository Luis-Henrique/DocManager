import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account-service';
import { AccountLoginView } from '../models/account-login-view';
import { AccountToken } from '../models/account-token-view';


@Component({
selector:'app-login',
templateUrl:'./login.component.html'
})

export class LoginComponent implements OnInit {

    returnUrl: string ='';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private accountService: AccountService
                ){}
                
    ngOnInit(){

    }

    login(){
        this.hideMessage();
        localStorage.removeItem('currentUser');
        var iUsername = (<HTMLInputElement>document.getElementById("username")).value;
        var iPassword = (<HTMLInputElement>document.getElementById("password")).value;

        if (iUsername == '' || iUsername == undefined) {
            this.showMessage('É necessário informar um usuário, verifique...');
            return;
        }       
        if (iPassword == '' || iPassword == undefined){
            this.showMessage('É necessário informar uma senha, verifique...');
            return;
        }

        const user = new AccountLoginView(iUsername,iPassword);        

        this.accountService.login(user).subscribe(
            (response:any) => {
                const userToken = new AccountToken(user.email,user.password, response.token);
                localStorage.setItem('currentUser', JSON.stringify(userToken));
                console.log(`Login efetuado com sucesso: ${JSON.stringify(response)}`);
                this.router.navigateByUrl('/dashboard');
            }, error => {
                console.log(`erro ao efetuar login ${error}`);
                this.showMessage('Login ou senha inválidos, verifique...');
            });
    }

    register(){
        this.router.navigateByUrl('/login')
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