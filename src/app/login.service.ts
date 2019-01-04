import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  loginUrl = '';
  flgLogado = false;

  constructor(private http: HttpClient) { }

  logar(){
    this.flgLogado = true;
  }

}
