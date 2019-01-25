import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frmlogin: FormGroup;
  flgLoginInvalido = false;

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    // this.frmlogin = new FormGroup({
    //   usuario: new FormControl(''),
    //   senha: new FormControl(''),
    // });
    this.frmlogin = this.fb.group({
      usuario: [null, [Validators.required, Validators.maxLength(30)]],
      senha: [null, [Validators.required, Validators.maxLength(30)]] 
    });
  }

  fazerLogin(frmlogin: FormGroup){
    if(frmlogin.value.usuario === AppComponent.USUARIO && frmlogin.value.senha === AppComponent.SENHA){
      NavbarComponent.flgLogado = true;
      console.log(frmlogin.value);
      this.router.navigate(['./telainicial']);
    } else {
      this.flgLoginInvalido = true;
    }
  }

  cancelarLogin(frmlogin: FormControl){
    frmlogin.reset();
  }

}
