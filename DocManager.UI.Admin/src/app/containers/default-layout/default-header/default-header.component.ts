import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  @Input() activeUser: string = "";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    var currentUser = localStorage.getItem('currentUser');
    if (currentUser != null && currentUser != undefined)
    {
      var user = JSON.parse(currentUser);
      this.activeUser = user["email"];
    } 
    else
       this.activeUser = '';
 }

 logout(){
           localStorage.removeItem('currentUser');
           this.activeUser = '';
           this.router.navigateByUrl('/login')
 }



}
