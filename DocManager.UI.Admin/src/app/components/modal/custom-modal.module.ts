import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomModalComponent } from './custom-modal.component';
import {ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, ModalModule, SharedModule, TableModule} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomModalComponent],
  exports:[CustomModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    FormModule,
    FormsModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    TableModule,
    SharedModule,
    GridModule
  ],
  providers: [],
})
export class CustomModalModule { }
