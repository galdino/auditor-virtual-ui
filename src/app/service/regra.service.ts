import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Regra } from '../model/regra';
import { AppComponent } from '../app.component';
import { Intent } from '../model/intent';

@Injectable()
export class RegraService {
  headers = new HttpHeaders({ authorization : 'Basic ' + btoa(AppComponent.PASS_WS) });

  constructor(private http: HttpClient) { }

  pesquisarRegra(codServico: string): Observable<Regra[]>{
    if(codServico != null){
      return this.http.get<Regra[]>(AppComponent.API_PESQUISAR_REGRAS + "?codServico=" + codServico, {headers: this.headers});
    }
  }

  pesquisarRegraGeral(): Observable<Intent[]>{
    return this.http.get<Intent[]>(AppComponent.API_PESQUISAR_REGRAS_GERAL, {headers: this.headers});
  }

}
