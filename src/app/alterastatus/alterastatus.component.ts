import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { Parametro } from '../model/parametro';
import { ParametroService } from '../service/parametro.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-alterastatus',
  templateUrl: './alterastatus.component.html',
  styleUrls: ['./alterastatus.component.css']
})
export class AlterastatusComponent implements OnInit {

  frmstatus: FormGroup;

  msgs: Message[] = [];
  msgsGrowl: Message[] = [];
  
  parametro: Parametro;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private parametroService: ParametroService) { }

  ngOnInit() {
    this.frmstatus = this.fb.group({ 
      inpSwitch: [true, [Validators.required]]
    });

    this.inicializarStatus();

  }

  inicializarStatus(){
    this.parametroService.pesquisarParametro(AppComponent.COD_UNIMED_FORTALEZA.toString()).subscribe(data => {
      if(data !== null){
        this.parametro = data;
        if(this.parametro.flagAtivaBuscaAtendimento === 'S'){
          this.frmstatus.setValue({
            inpSwitch: true
          });
        } else {
          this.frmstatus.setValue({
            inpSwitch: false
          });
        }
      }
    }, error => {
        console.log(error);
        this.msgsGrowl = [];
        this.msgsGrowl.push({severity:'info', summary:'', detail:'Ocorreu um erro no servidor do Assistente! Favor contactar TI para suporte!'});
    });
  }

  handleChange(event){
    if(!event.checked){
      this.frmstatus.setValue({
        inpSwitch: true
      });
      this.confirmationService.confirm({
        message: 'Deseja realmente desativar o Assistente Virtual?',
        header: 'Confirmar Desativar',
        icon: 'fa fa-info-circle',
        accept: () => {
          this.parametro.flagAtivaBuscaAtendimento = 'N';
          this.parametroService.atualizarParametro(this.parametro).subscribe(data => {
            if(data !== null){
              this.inicializarStatus();
              this.msgsGrowl = [];
              this.msgsGrowl.push({severity:'info', summary:'', detail:'Assistente Virtual desativado com sucesso!'});
            }
          }, error => {
              console.log(error);
              this.msgsGrowl = [];
              this.msgsGrowl.push({severity:'info', summary:'', detail:'Ocorreu um erro no servidor do Assistente! Favor contactar TI para suporte!'});
          });
          // this.frmstatus.setValue({
          //   inpSwitch: false
          // });
        }
      });
    } else {
      this.frmstatus.setValue({
        inpSwitch: false
      });
      this.confirmationService.confirm({
        message: 'Deseja realmente ativar o Assistente Virtual?',
        header: 'Confirmar Ativar',
        icon: 'fa fa-info-circle',
        accept: () => {
          this.parametro.flagAtivaBuscaAtendimento = 'S';
          this.parametroService.atualizarParametro(this.parametro).subscribe(data => {
            if(data !== null){
              this.inicializarStatus();
              this.msgsGrowl = [];
              this.msgsGrowl.push({severity:'info', summary:'', detail:'Assistente Virtual ativado com sucesso!'});
            }
          }, error => {
              console.log(error);
              this.msgsGrowl = [];
              this.msgsGrowl.push({severity:'info', summary:'', detail:'Ocorreu um erro no servidor do Assistente! Favor contactar TI para suporte!'});
          });
          // this.frmstatus.setValue({
          //   inpSwitch: true
          // });
        }
      });
    }
  }

  flgLogado(): boolean{
    if(!NavbarComponent.flgLogado){
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'', detail:'Login não efetuado! Favor  <a href="http://localhost:4200">realizar login</a> para acessar página!'});
    } 
    return NavbarComponent.flgLogado;
  }

  flgStatus(): boolean{
    return NavbarComponent.flgStatus;
  }

}
