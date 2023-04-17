import { Component, EventEmitter, Output, Input, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements  OnInit{
  
  //@ViewChild('CustomModal') private customModalContent!: ElementRef;
  constructor(){}
  ngOnInit(): void {}

  @Input() title: string = '';
  @Input() body: string = '';
  @Input() showModal: boolean = false;
  
  
  @Output() closeModal = new EventEmitter();
  @Output() cancelModal = new EventEmitter();
  @Output() confirmModal = new EventEmitter();

  modalConfirme(){
    this.confirmModal.emit('confirm');
  }

  modalClose(){
    this.closeModal.emit('close');
  }
    
  modalCancel(){
    this.cancelModal.emit('cancel');
  }

}
