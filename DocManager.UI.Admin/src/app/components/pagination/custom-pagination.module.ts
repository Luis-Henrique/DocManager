import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PagerService } from '../../services/page-service';
import { CustomPaginationComponent } from './custom-pagination.component';


@NgModule({
  declarations: [CustomPaginationComponent],
  exports:[CustomPaginationComponent],
  imports: [
    CommonModule
  ],
  providers: [PagerService],
})
export class CustomPaginationModule { }
