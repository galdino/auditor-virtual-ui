import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { Intent } from '../model/intent';
import { RegraService } from '../service/regra.service';

@Component({
  selector: 'app-desativaregra',
  templateUrl: './desativaregra.component.html',
  styleUrls: ['./desativaregra.component.css']
})
export class DesativaregraComponent implements OnInit {

  frmregra: FormGroup;
  
  msgs: Message[] = [];
  msgsGrowl: Message[] = [];
  
  intents: SelectItem[] = [];
  intentsAux: Intent[] = [];
  selectedIntent: string;

  item: Intent;

  flgDisabledAtivar = true;
  flgDisabledDesativar = true;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private regraService: RegraService) { }

  ngOnInit() {
    this.frmregra = this.fb.group({ 
      selectedIntent: [null, [Validators.required]]
    });

    this.inicializarIntents();

    // this.intents = [
    //   {label: 'critica_quantidade', value: 'critica_quantidade'},
    //   {label: 'critica_intervalo', value: 'critica_intervalo'},
    //   {label: 'guia_nao_permite_realizacao_servico', value: 'guia_nao_permite_realizacao_servico'},
    //   {label: 'servico_exige_guia_referencia', value: 'servico_exige_guia_referencia'},
    //   {label: 'guia_paciente_internado', value: 'guia_paciente_internado'},
    //   {label: 'digitacao_cartao_nao_permitida', value: 'digitacao_cartao_nao_permitida'},
    //   {label: 'avaliacao_servico', value: 'avaliacao_servico'},
    //   {label: 'cartao_beneficiario_fora_validade', value: 'cartao_beneficiario_fora_validade'},
    //   {label: 'carteira_bloqueada', value: 'carteira_bloqueada'},
    //   {label: 'autorizacao_so_pode_ser_feita_na_unimed_ou_teleatendimento', value: 'autorizacao_so_pode_ser_feita_na_unimed_ou_teleatendimento'}
    // ];
  }

  inicializarIntents(){
    this.regraService.pesquisarRegraGeral().subscribe(data => {
      this.intentsAux = data;
      this.intentsAux.forEach(element => {
        this.intents.push({label: element.intents, value: element.intents});
      });
    });
  }

  desativarRegra(frmregra: FormGroup){
    this.confirmationService.confirm({
      message: 'Deseja realmente desativar a regra ' + frmregra.value.selectedIntent + ' de todos os serviços?',
      header: 'Confirmar Desativar',
      icon: 'fa fa-info-circle',
      accept: () => {
        this.item.flagAtiva = "N";
        this.regraService.atualizarRegraGeral(this.item).subscribe(data => {
          if(data !== null){            
            frmregra.reset();
            
            this.inicializarIntents();
            
            this.flgDisabledAtivar = true;
            this.flgDisabledDesativar = true;
            
            this.msgsGrowl = [];
            this.msgsGrowl.push({severity:'info', summary:'', detail:'Regra desativada com sucesso em todos os serviços!'});
          }
        });
      }
    });
  }

  ativarRegra(frmregra: FormGroup){
    this.confirmationService.confirm({
      message: 'Deseja realmente ativar a regra ' + frmregra.value.selectedIntent + ' de todos os serviços?',
      header: 'Confirmar Ativar',
      icon: 'fa fa-info-circle',
      accept: () => {
        this.item.flagAtiva = "S";
        this.regraService.atualizarRegraGeral(this.item).subscribe(data => {
          if(data !== null){            
            frmregra.reset();
            
            this.inicializarIntents();
            
            this.flgDisabledAtivar = true;
            this.flgDisabledDesativar = true;
            
            this.msgsGrowl = [];
            this.msgsGrowl.push({severity:'info', summary:'', detail:'Regra ativada com sucesso em todos os serviços!'});
          }
        });
      }
    });
  }

  cancelarDesativar(frmregra: FormGroup){
    frmregra.reset();
    this.flgDisabledDesativar = true;
    this.flgDisabledAtivar = true;
  }

  onChangeRegra(frmregra: FormGroup){
    this.flgDisabledDesativar = true;
    this.flgDisabledAtivar = true;
    this.item = this.intentsAux.find(this.findIntentToUpdate, frmregra.value.selectedIntent);
    if(this.item.flagAtiva === "S"){
      this.flgDisabledDesativar = false;
    } else if(this.item.flagAtiva === "N"){
      this.flgDisabledAtivar = false;
    }
  }

  findIntentToUpdate(item) { 
    return item.intents === this;
   }
  
  flgLogado(): boolean{
    if(!NavbarComponent.flgLogado){
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'', detail:'Login não efetuado! Favor  <a href="http://localhost:4200">realizar login</a> para acessar página!'});
    } 
    return NavbarComponent.flgLogado;
   }

}
