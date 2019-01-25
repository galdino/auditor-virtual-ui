import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  static USUARIO='****';
  static SENHA='****';
  static PASS_WS='****';
  static COD_UNIMED_FORTALEZA=63;
  static API_PESQUISAR_SERVICOS_COD="http://localhost:8081/auditorvirtual/servicos";
  static API_PESQUISAR_ALTERAR_REGRAS_GERAL="http://localhost:8081/auditorvirtual/regrasgeral";
  static API_PESQUISAR_SALVAR_ALTERAR_REGRAS="http://localhost:8081/auditorvirtual/regras";
  static API_PESQUISAR_ALTERAR_PARAMETRO="http://localhost:8081/auditorvirtual/parametro";
}
