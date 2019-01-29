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
  static SERVER_API_URL="http://s01lnx146.unimedfortaleza.com.br:8081/auditorvirtual";
  static API_PESQUISAR_SERVICOS_COD= AppComponent.SERVER_API_URL + "/servicos";
  static API_PESQUISAR_ALTERAR_REGRAS_GERAL=AppComponent.SERVER_API_URL + "/regrasgeral";
  static API_PESQUISAR_SALVAR_ALTERAR_REGRAS=AppComponent.SERVER_API_URL + "/regras";
  static API_PESQUISAR_ALTERAR_PARAMETRO=AppComponent.SERVER_API_URL + "/parametro";
}
