export class AccountPutRequest{
    username:string='';
    email:string='';
    newpassword:string='';

    constructor(_username:string, _email:string, _newpassword:string){
     this.email = _email;
     this.username = _username;
     this.newpassword = _newpassword; 
    }
}
