import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() public tituloTela: string;
  public static flgLogado= false;
  public static flgStatus= true;

  constructor() { }

  ngOnInit() {
  }

}
