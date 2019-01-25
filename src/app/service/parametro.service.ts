import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs/Observable';
import { Parametro } from '../model/parametro';

@Injectable()
export class ParametroService {
  headers = new HttpHeaders({ authorization : 'Basic ' + btoa(AppComponent.PASS_WS) });

  constructor(private http: HttpClient) { }

  pesquisarParametro(codUnimed: string): Observable<Parametro>{
    if(codUnimed !== null){
      return this.http.get<Parametro>(AppComponent.API_PESQUISAR_ALTERAR_PARAMETRO + "?codigoUnimed=" + codUnimed, {headers: this.headers});
    }
  }

  atualizarParametro(parametro: Parametro){
    if(parametro.id != null){
      return this.http.put(AppComponent.API_PESQUISAR_ALTERAR_PARAMETRO, parametro, {headers: this.headers});
    }
  }

}
