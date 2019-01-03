import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {
  public static COD_UNIMED_FORTALEZA=63;

  frmservicos: FormGroup;
  display: boolean = false;

  intents: SelectItem[];
  selectedIntent: number;

  servCriticaAutorizacao = [];

  msgs: Message[] = [];

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.frmservicos = this.fb.group({
      codigo: [null, [Validators.required]],
      dv: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      codigoUnimed: [ServicosComponent.COD_UNIMED_FORTALEZA, [Validators.required]],
      selectedIntent: [null, [Validators.required]],
      qtdPermitida: [null, [Validators.required]]
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

  cadastrarRegra(frmservicos: FormGroup){
    let flgCadastra = true;
    this.servCriticaAutorizacao.forEach(element => {
      if(element.intents == frmservicos.value.selectedIntent){
        flgCadastra = false;
      }
    });

    if(!flgCadastra){
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'', detail:'Crítica Autorização já cadastrada para esse serviço!'});
    } else {
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth();
      let year = currentDate.getFullYear();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let seconds = currentDate.getSeconds();

      let dataInclusao = this.pad(day) + '/' + this.pad(month + 1) + '/' + year + ' ' + hours + ':' + minutes + ':' + this.pad(seconds);
      
      let servCriticaAutorizacaoCadastrado = []
      servCriticaAutorizacaoCadastrado.push({ id: 2229, cod_serv: frmservicos.value.codigo, intents: frmservicos.value.selectedIntent, data_inclusao: dataInclusao, data_exclusao: '', quantidade_permitida: frmservicos.value.qtdPermitida });
      
      this.servCriticaAutorizacao = [...servCriticaAutorizacaoCadastrado, ...this.servCriticaAutorizacao];

      let codigo = frmservicos.value.codigo;
      let dv = frmservicos.value.dv;
      let descricao = frmservicos.value.descricao;

      frmservicos.reset();
      this.frmservicos.setValue({
        codigo: codigo,
        dv: dv,
        descricao: descricao,
        codigoUnimed: ServicosComponent.COD_UNIMED_FORTALEZA,
        selectedIntent: null,
        qtdPermitida: null,
      });

      this.msgs = [];
      this.msgs.push({severity:'info', summary:'', detail:'Crítica Autorização cadastrada com sucesso!'});
    }

  }

  showPesquisarServico(){
    this.display = true;
  }

  onDialogClose(event) {
    this.display = event;
 }

  onServicoChange(event) {
    this.frmservicos.setValue({
      codigo: event.codigo,
      dv: event.dig_verificador,
      descricao: event.descricao_servico,
      codigoUnimed: ServicosComponent.COD_UNIMED_FORTALEZA,
      selectedIntent: this.frmservicos.value.selectedIntent,
      qtdPermitida: this.frmservicos.value.qtdPermitida,
    });
    
    let servCriticaAutorizacaoItens = [
      { id: 2213, cod_serv: 4080501, intents: 'cartao_beneficiario_fora_validade', data_inclusao: '17/08/2018 11:55:21', data_exclusao: '18/08/2018 11:00:00', quantidade_permitida: 0 },
      // { id: 2229, cod_serv: 4080501, intents: 'carteira_bloqueada', data_inclusao: '17/08/2018 11:55:29', data_exclusao: '', quantidade_permitida: 0 },
      { id: 396, cod_serv: 4080501, intents: 'critica_intervalo', data_inclusao: '17/07/2018 10:16:48', data_exclusao: '', quantidade_permitida: 2 },
      { id: 391, cod_serv: 4080501, intents: 'critica_quantidade', data_inclusao: '17/07/2018 10:15:48', data_exclusao: '18/07/2018 09:05:48', quantidade_permitida: 2 },
      { id: 386, cod_serv: 4080501, intents: 'digitacao_cartao_nao_permitida', data_inclusao: '16/07/2018 09:47:23', data_exclusao: '', quantidade_permitida: 2 },
      { id: 255, cod_serv: 4080501, intents: 'guia_paciente_internado', data_inclusao: '15/07/2018 18:59:05', data_exclusao: '', quantidade_permitida: 2 }
    ];

    this.servCriticaAutorizacao = [...servCriticaAutorizacaoItens];
 }

 confirmReativar(regra){
   this.confirmationService.confirm({
     message: 'Deseja realmente reativar a regra ' + regra.intents + ' do serviço ' + regra.cod_serv + '?',
     header: 'Confirmar Reativar',
     icon: 'fa fa-info-circle',
     accept: () => {
       let  item = this.servCriticaAutorizacao.find(this.findIndexToUpdate, regra.id);
       let index =  this.servCriticaAutorizacao.indexOf(regra);
       item.data_exclusao = '';
       this.servCriticaAutorizacao[index] = item;
       this.msgs = [];
       this.msgs.push({severity:'info', summary:'', detail:'Regra reativada com sucesso!'});
     }
   });
 }

 findIndexToUpdate(item) { 
  return item.id === this;
 }

 confirmExcluir(regra){
  this.confirmationService.confirm({
    message: 'Deseja realmente excluir a regra ' + regra.intents + ' do serviço ' + regra.cod_serv + '?',
    header: 'Confirmar Excluir',
    icon: 'fa fa-info-circle',
    accept: () => {
      let  item = this.servCriticaAutorizacao.find(this.findIndexToUpdate, regra.id);
      let index =  this.servCriticaAutorizacao.indexOf(regra);

      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth();
      let year = currentDate.getFullYear();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let seconds = currentDate.getSeconds();

      let dataExclusao = this.pad(day) + '/' + this.pad(month + 1) + '/' + year + ' ' + hours + ':' + minutes + ':' + this.pad(seconds);

      item.data_exclusao = dataExclusao;

      this.servCriticaAutorizacao[index] = item;
      
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'', detail:'Regra excluída com sucesso!'});
    }
  });
 }
 
 pad(n) {
  return n<10 ? '0'+n : n;
 }

 cancelarRegra(frmservicos: FormControl){
  frmservicos.reset();
  this.frmservicos.setValue({
    codigo: null,
    dv: null,
    descricao: null,
    codigoUnimed: ServicosComponent.COD_UNIMED_FORTALEZA,
    selectedIntent: null,
    qtdPermitida: null,
  });

  this.servCriticaAutorizacao = [];
 }

}