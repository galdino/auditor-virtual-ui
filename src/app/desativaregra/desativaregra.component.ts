import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-desativaregra',
  templateUrl: './desativaregra.component.html',
  styleUrls: ['./desativaregra.component.css']
})
export class DesativaregraComponent implements OnInit {

  frmregra: FormGroup;
  
  msgs: Message[] = [];
  msgsGrowl: Message[] = [];
  
  intents: SelectItem[];
  selectedIntent: number;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.frmregra = this.fb.group({ 
      selectedIntent: [null, [Validators.required]]
    });

    this.intents = [
      {label: 'critica_quantidade', value: 'critica_quantidade'},
      {label: 'critica_intervalo', value: 'critica_intervalo'},
      {label: 'guia_nao_permite_realizacao_servico', value: 'guia_nao_permite_realizacao_servico'},
      {label: 'servico_exige_guia_referencia', value: 'servico_exige_guia_referencia'},
      {label: 'guia_paciente_internado', value: 'guia_paciente_internado'},
      {label: 'digitacao_cartao_nao_permitida', value: 'digitacao_cartao_nao_permitida'},
      {label: 'avaliacao_servico', value: 'avaliacao_servico'},
      {label: 'cartao_beneficiario_fora_validade', value: 'cartao_beneficiario_fora_validade'},
      {label: 'carteira_bloqueada', value: 'carteira_bloqueada'},
      {label: 'autorizacao_so_pode_ser_feita_na_unimed_ou_teleatendimento', value: 'autorizacao_so_pode_ser_feita_na_unimed_ou_teleatendimento'}
    ];
  }

  desativarRegra(frmregra: FormGroup){
    this.confirmationService.confirm({
      message: 'Deseja realmente desativar a regra ' + frmregra.value.selectedIntent + ' de todos os serviços?',
      header: 'Confirmar Desativar',
      icon: 'fa fa-info-circle',
      accept: () => {
        this.msgsGrowl = [];
        this.msgsGrowl.push({severity:'info', summary:'', detail:'Regra desativada com sucesso em todos os serviços!'});
        frmregra.reset();
      }
    });
  }

  ativarRegra(frmregra: FormGroup){
    this.confirmationService.confirm({
      message: 'Deseja realmente ativar a regra ' + frmregra.value.selectedIntent + ' de todos os serviços?',
      header: 'Confirmar Ativar',
      icon: 'fa fa-info-circle',
      accept: () => {
        this.msgsGrowl = [];
        this.msgsGrowl.push({severity:'info', summary:'', detail:'Regra ativada com sucesso em todos os serviços!'});
        frmregra.reset();
      }
    });
  }

  cancelarDesativar(frmregra: FormGroup){
    frmregra.reset();
  }
  
  flgLogado(): boolean{
    if(!NavbarComponent.flgLogado){
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'', detail:'Login não efetuado! Favor  <a href="http://localhost:4200">realizar login</a> para acessar página!'});
    } 
    return NavbarComponent.flgLogado;
   }

}
