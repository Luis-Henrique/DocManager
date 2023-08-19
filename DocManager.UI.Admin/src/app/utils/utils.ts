import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class Utils{

    constructor(private router:Router, private toastr: ToastrService){}


    showSuccessMessage(message:any,action: string){
      this.toastr.success(message,action);      
    }

    showErrorMessage(messages:any,action: string){
        var listItems = messages.split('</br>');

       for (let index = 0; index < listItems.length; index++) {
         const element = listItems[index];
         if (element != '' && element != undefined)
            this.toastr.error(element, action); 
       }
      }

    getUserAutorization(currentUser?: string){
      var message = currentUser?.split('userAutorization":');
      if(message == null){
        return ""
      }else{
        return message[1].split(',')
      }
    }

    getUserGroupAutorization(currentUser?: string){
      var message = currentUser?.split('userGroupAutorization":"');
      if(message == null){
        return ""
      }else{
        var response = message[1].split('"}');
        return response[0]
      }
    }

    navigateTo(url:string, param:string){
        if (param !='' && param != undefined && param != null)
            this.router.navigate([url, param]);
        else
        this.router.navigate([url]);
      }
}