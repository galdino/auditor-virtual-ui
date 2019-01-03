//npm install --no-optional : comando para erro que ocorre na instalacao de alguma dependencia via npm install
//Ex: npm install bootstrap@3.3.7 --save --no-optional
//ng g c pdialog --spec=false : comando para criar um componente sem arquitetura de teste
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { DataTableModule, ButtonModule, InputTextModule, InputMaskModule, PasswordModule, FieldsetModule, DialogModule, DropdownModule, ConfirmDialogModule, ConfirmationService, MessagesModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { TelainicialComponent } from './telainicial/telainicial.component';
import { ServicosComponent } from './servicos/servicos.component';
import { PdialogComponent } from './pdialog/pdialog.component';

const ROUTES: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'telainicial', component: TelainicialComponent },
  { path: 'servicos', component: ServicosComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TelainicialComponent,
    ServicosComponent,
    PdialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DataTableModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    PasswordModule,
    ReactiveFormsModule,
    FieldsetModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    MessagesModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    LoginService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
