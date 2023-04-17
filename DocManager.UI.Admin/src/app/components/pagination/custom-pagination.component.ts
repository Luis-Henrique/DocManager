import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent{

  @Output() callNavitation = new EventEmitter<number>();

  @Input() pager: any = {};
  
  callPage(page:number) {
    this.callNavitation.next(page);
  }
}
