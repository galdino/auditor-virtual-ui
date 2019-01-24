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

  pesquisarRegraGeral(): Observable<Intent[]>{
    return this.http.get<Intent[]>(AppComponent.API_PESQUISAR_ALTERAR_REGRAS_GERAL, {headers: this.headers});
  }

  atualizarRegraGeral(intent: Intent){
    if(intent.id != null){
      return this.http.put(AppComponent.API_PESQUISAR_ALTERAR_REGRAS_GERAL, intent, {headers: this.headers});
    }
  }
  
  pesquisarRegra(codServico: string): Observable<Regra[]>{
    if(codServico != null){
      return this.http.get<Regra[]>(AppComponent.API_PESQUISAR_SALVAR_ALTERAR_REGRAS + "?codServico=" + codServico, {headers: this.headers});
    }
  }
  
  salvarRegra(regra: Regra){
    if(regra.codServMedHosp != null){
      return this.http.post(AppComponent.API_PESQUISAR_SALVAR_ALTERAR_REGRAS, regra, {headers: this.headers});
    }
  }

  atualizarRegra(regra: Regra){
    if(regra.codServMedHosp != null){
      return this.http.put(AppComponent.API_PESQUISAR_SALVAR_ALTERAR_REGRAS, regra, {headers: this.headers});
    }
  }

}
