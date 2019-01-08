import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-alterastatus',
  templateUrl: './alterastatus.component.html',
  styleUrls: ['./alterastatus.component.css']
})
export class AlterastatusComponent implements OnInit {

  frmstatus: FormGroup;

  msgs: Message[] = [];
  msgsGrowl: Message[] = [];

  inpSwitch: boolean;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.frmstatus = this.fb.group({ 
      inpSwitch: [this.flgStatus, [Validators.required]]
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
          this.frmstatus.setValue({
            inpSwitch: false
          });
          this.msgsGrowl = [];
          this.msgsGrowl.push({severity:'info', summary:'', detail:'Assistente Virtual desativado com sucesso!'});
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
          this.frmstatus.setValue({
            inpSwitch: true
          });
          this.msgsGrowl = [];
          this.msgsGrowl.push({severity:'info', summary:'', detail:'Assistente Virtual ativado com sucesso!'});
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
