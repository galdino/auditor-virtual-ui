//npm install --no-optional : comando para erro que ocorre na instalacao de alguma dependencia via npm install
//Ex: npm install bootstrap@3.3.7 --save --no-optional
//ng g c pdialog --spec=false : comando para criar um componente sem arquitetura de teste
//ng g class /model/regra --spec=false : comando para criar uma classe dentro de uma pasta especifica
//ng g s /service/servico --spec=false : comando para criar um service dentro de uma pasta especifica
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { DataTableModule, ButtonModule, InputTextModule, InputMaskModule, PasswordModule, FieldsetModule, DialogModule, DropdownModule, ConfirmDialogModule, ConfirmationService, MessagesModule, GrowlModule, InputSwitchModule, ToggleButtonModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { TelainicialComponent } from './telainicial/telainicial.component';
import { ServicosComponent } from './servicos/servicos.component';
import { PdialogComponent } from './pdialog/pdialog.component';
import { DesativaregraComponent } from './desativaregra/desativaregra.component';
import { AlterastatusComponent } from './alterastatus/alterastatus.component';
import { PdialogalterarComponent } from './pdialogalterar/pdialogalterar.component';
import { ServicoService } from './service/servico.service';
import { RegraService } from './service/regra.service';
import { ParametroService } from './service/parametro.service';

const ROUTES: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'telainicial', component: TelainicialComponent },
  { path: 'servicos', component: ServicosComponent },
  { path: 'desativaregra', component: DesativaregraComponent },
  { path: 'alterastatus', component: AlterastatusComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TelainicialComponent,
    ServicosComponent,
    PdialogComponent,
    DesativaregraComponent,
    AlterastatusComponent,
    PdialogalterarComponent
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
    GrowlModule,
    InputSwitchModule,
    ToggleButtonModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    LoginService,
    ServicoService,
    RegraService,
    ParametroService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
