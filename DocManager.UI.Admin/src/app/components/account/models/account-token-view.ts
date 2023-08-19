export class AccountToken{
    email:string='';
    password:string='';
    userAutorization:number=0;
    token:string='';
    userGroupAutorization:string='';

    constructor(_email:string, _password:string, _token:string, _userAutorization:number, _userGroupAutorization:string){
        this.email = _email;
        this.password = _password; 
        this.userAutorization = _userAutorization;
        this.token = _token;
        this.userGroupAutorization = _userGroupAutorization;
       }
}
