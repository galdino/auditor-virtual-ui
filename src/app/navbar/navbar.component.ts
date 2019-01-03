import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() public tituloTela: string;
  @Input() public static flgLogado= false;
  @Output() loginChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.loginChange.emit(NavbarComponent.flgLogado);
  }

}
