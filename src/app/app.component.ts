import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  static PASS_WS='auditorvirtual:auditorvirtual2018ws';
  static API_PESQUISAR_SERVICOS_COD="http://localhost:8081/auditorvirtual/servicos";
  static API_PESQUISAR_REGRAS_GERAL="http://localhost:8081/auditorvirtual/regrasgeral";
  static API_PESQUISAR_SALVAR_ALTERAR_REGRAS="http://localhost:8081/auditorvirtual/regras";
}
