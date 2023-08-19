export class AccountView{
    username:string='';
    password:string='';
    email:string='';
    id:string = '';
    active: boolean = false;
    userAutorization: number = 0;
    userGroupAutorization: string ='';

    constructor(_username:string,_email:string, _password:string, id:string, active:boolean, userAutorization:number, userGroupAutorization:string){
     this.username = _username;
     this.email = _email;
     this.password = _password; 
     this.id = id;
     this.active = active;
     this.userAutorization = userAutorization;
     this.userGroupAutorization = userGroupAutorization;
    }
}
