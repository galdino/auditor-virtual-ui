import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-telainicial',
  templateUrl: './telainicial.component.html',
  styleUrls: ['./telainicial.component.css']
})
export class TelainicialComponent implements OnInit {

  msgs: Message[] = [{severity:'info', summary:'', detail:'Login não efetuado! Favor  <a href="http://localhost:4200">realizar login</a> para acessar página!'}];

  constructor() { }

  ngOnInit() {
  }

  // onLoginChange(event){
  //   this.flgLogado = event;
  // }

  flgLogado(): boolean{
    return NavbarComponent.flgLogado;
  }  

}
