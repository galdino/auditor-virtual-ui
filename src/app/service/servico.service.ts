import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class ServicoService {

  constructor(private http: HttpClient) { }

  pesquisarServico(codServico: string, descricao: string): Observable<any[]>{
    const headers = new HttpHeaders({ authorization : 'Basic ' + btoa(AppComponent.PASS_WS) });    

    if(codServico != null){
      return this.http.get<any[]>(AppComponent.API_PESQUISAR_SERVICOS_COD + "?codServico=" + codServico + "&descricao=" + descricao, {headers: headers});
    }
  }

}
