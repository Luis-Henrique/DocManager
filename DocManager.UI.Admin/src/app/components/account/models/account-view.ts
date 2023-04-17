export class AccountView{
    username:string='';
    password:string='';
    email:string='';

    constructor(_username:string,_email:string, _password:string){
     this.username = _username;
     this.email = _email;
     this.password = _password; 
    }
}
