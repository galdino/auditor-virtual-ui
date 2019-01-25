import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { NavbarComponent } from '../navbar/navbar.component';
import { Regra } from '../model/regra';
import { RegraService } from '../service/regra.service';
import { Intent } from '../model/intent';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {
  frmservicos: FormGroup;
  display: boolean = false;
  displayAltRegra: boolean = false;

  intents: SelectItem[] = [];
  selectedIntent: number;

  servCriticaAutorizacao: Regra[];

  msgs: Message[] = [];
  msgsGrowl: Message[] = [];

  selectedRegra = new Regra();

  loading: boolean;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private regraService: RegraService) { }

  ngOnInit() {
    this.frmservicos = this.fb.group({
      codigo: [null, [Validators.required]],
      dv: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      codigoUnimed: [AppComponent.COD_UNIMED_FORTALEZA, [Validators.required]],
      selectedIntent: [null, [Validators.required]],
      qtdPermitida: [null, [Validators.required]]
    });

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

    this.inicializarIntents();

  }

  inicializarIntents(){
    let intentsAux: Intent[] = [];

    this.regraService.pesquisarRegraGeral().subscribe(data => {
      intentsAux = data;
      intentsAux.forEach(element => {
        this.intents.push({label: element.intents, value: element.intents});
      });
    }, error => {
        console.log(error);
        this.msgsGrowl = [];
        this.msgsGrowl.push({severity:'info', summary:'', detail:'Ocorreu um erro no servidor do Assistente! Favor contactar TI para suporte!'});
    });
  }

  cadastrarRegra(frmservicos: FormGroup){
    this.loading = true;
    let flgCadastra = true;
    this.servCriticaAutorizacao.forEach(element => {
      if(element.intents == frmservicos.value.selectedIntent){
        flgCadastra = false;
      }
    });

    if(!flgCadastra){
      this.loading = false;
      this.msgsGrowl = [];
      this.msgsGrowl.push({severity:'info', summary:'', detail:'Crítica Autorização já cadastrada para esse serviço!'});
    } else {
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth();
      let year = currentDate.getFullYear();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let seconds = currentDate.getSeconds();

      let dataInclusao = this.pad(day) + '/' + this.pad(month + 1) + '/' + year + ' ' + this.pad(hours) + ':' + this.pad(minutes) + ':' + this.pad(seconds);
      
      // let servCriticaAutorizacaoCadastrado = []
      // servCriticaAutorizacaoCadastrado.push({ id: 2229, cod_serv: frmservicos.value.codigo, intents: frmservicos.value.selectedIntent, data_inclusao: dataInclusao, data_exclusao: '', quantidade_permitida: frmservicos.value.qtdPermitida });
      let regra = new Regra();
      regra.codUnimed = frmservicos.value.codigoUnimed;
      regra.intents = frmservicos.value.selectedIntent;
      regra.codServMedHosp = frmservicos.value.codigo;
      regra.dvServMedHosp = frmservicos.value.dv;
      regra.dataInclusao = dataInclusao;
      regra.dataExclusao = null;
      regra.qtdeServMedHospPermitida = frmservicos.value.qtdPermitida;
      regra.versao = 0;
      
      this.regraService.salvarRegra(regra).subscribe(data => {
        if(data !== null){
          let codigo = frmservicos.value.codigo;
          let dv = frmservicos.value.dv;
          let descricao = frmservicos.value.descricao;

          frmservicos.reset();
          this.frmservicos.setValue({
            codigo: codigo,
            dv: dv,
            descricao: descricao,
            codigoUnimed: AppComponent.COD_UNIMED_FORTALEZA,
            selectedIntent: null,
            qtdPermitida: null,
          });

          this.pesquisarRegrasServico(codigo);

          this.msgsGrowl = [];
          this.msgsGrowl.push({severity:'info', summary:'', detail:'Crítica Autorização cadastrada com sucesso!'});

          this.loading = false;
        }
      }, error => {
          console.log(error);
          this.msgsGrowl = [];
          this.msgsGrowl.push({severity:'info', summary:'', detail:'Ocorreu um erro no servidor do Assistente! Favor contactar TI para suporte!'});
      });
      
      // this.servCriticaAutorizacao = [...servCriticaAutorizacaoCadastrado, ...this.servCriticaAutorizacao];

      // let codigo = frmservicos.value.codigo;
      // let dv = frmservicos.value.dv;
      // let descricao = frmservicos.value.descricao;

      // frmservicos.reset();
      // this.frmservicos.setValue({
      //   codigo: codigo,
      //   dv: dv,
      //   descricao: descricao,
      //   codigoUnimed: ServicosComponent.COD_UNIMED_FORTALEZA,
      //   selectedIntent: null,
      //   qtdPermitida: null,
      // });

      // this.msgsGrowl = [];
      // this.msgsGrowl.push({severity:'info', summary:'', detail:'Crítica Autorização cadastrada com sucesso!'});
    }

  }

  showPesquisarServico(){
    this.display = true;
  }

  showAlterarRegra(regra){
    this.displayAltRegra = true;
    this.selectedRegra = regra;
  }

  onDialogClose(event) {
    this.display = event;
 }

  onDialogRegraClose(event) {
    this.displayAltRegra = event;
 }

  onServicoChange(event) {
    this.loading = true;
    this.frmservicos.setValue({
      codigo: event.codServico,
      dv: event.dvServico,
      descricao: event.descricao,
      codigoUnimed: AppComponent.COD_UNIMED_FORTALEZA,
      selectedIntent: this.frmservicos.value.selectedIntent,
      qtdPermitida: this.frmservicos.value.qtdPermitida,
    });
    
    // let servCriticaAutorizacaoItens = [
    //   { id: 2213, cod_serv: 4080501, intents: 'cartao_beneficiario_fora_validade', data_inclusao: '17/08/2018 11:55:21', data_exclusao: '18/08/2018 11:00:00', quantidade_permitida: 0 },
    //   // { id: 2229, cod_serv: 4080501, intents: 'carteira_bloqueada', data_inclusao: '17/08/2018 11:55:29', data_exclusao: '', quantidade_permitida: 0 },
    //   { id: 396, cod_serv: 4080501, intents: 'critica_intervalo', data_inclusao: '17/07/2018 10:16:48', data_exclusao: '', quantidade_permitida: 2 },
    //   { id: 391, cod_serv: 4080501, intents: 'critica_quantidade', data_inclusao: '17/07/2018 10:15:48', data_exclusao: '18/07/2018 09:05:48', quantidade_permitida: 2 },
    //   { id: 386, cod_serv: 4080501, intents: 'digitacao_cartao_nao_permitida', data_inclusao: '16/07/2018 09:47:23', data_exclusao: '', quantidade_permitida: 2 },
    //   { id: 255, cod_serv: 4080501, intents: 'guia_paciente_internado', data_inclusao: '15/07/2018 18:59:05', data_exclusao: '', quantidade_permitida: 2 }
    // ];

    let codigoServicoAux: string;
    codigoServicoAux = event.codServico;

    this.loading = true;
    this.pesquisarRegrasServico(codigoServicoAux);
 }

  private pesquisarRegrasServico(codigoServicoAux: string) {
    this.regraService.pesquisarRegra(codigoServicoAux).subscribe(data => {
      this.servCriticaAutorizacao = data;
      this.loading = false;
    }, error => {
        console.log(error);
        this.msgsGrowl = [];
        this.msgsGrowl.push({severity:'info', summary:'', detail:'Ocorreu um erro no servidor do Assistente! Favor contactar TI para suporte!'});
    });
  }

 onRegraChange(event){
  // let servCriticaAutorizacaoAux = [];
  // servCriticaAutorizacaoAux = [...servCriticaAutorizacaoAux, ...this.servCriticaAutorizacao];
  // let  item = servCriticaAutorizacaoAux.find(this.findIndexToUpdate, event.id);
  // let index = servCriticaAutorizacaoAux.indexOf(item);
  // servCriticaAutorizacaoAux[index] = event;

  // this.servCriticaAutorizacao = [];
  // this.servCriticaAutorizacao = [...this.servCriticaAutorizacao, ...servCriticaAutorizacaoAux];
  this.loading = true;
  this.pesquisarRegrasServico(event.codServMedHosp);

  this.msgsGrowl = [];
  this.msgsGrowl.push({severity:'info', summary:'', detail:'Regra alterada com sucesso!'});

 }

 confirmReativar(regra: Regra){
   this.confirmationService.confirm({
     message: 'Deseja realmente reativar a regra ' + regra.intents + ' do serviço ' + regra.codServMedHosp + '?',
     header: 'Confirmar Reativar',
     icon: 'fa fa-info-circle',
     accept: () => {
       this.loading = true;
      //  let  item = this.servCriticaAutorizacao.find(this.findIndexToUpdate, regra.id);
      //  let index =  this.servCriticaAutorizacao.indexOf(regra);
      //  item.dataExclusao = '';
      //  this.servCriticaAutorizacao[index] = item;

      regra.dataExclusao = null;
      this.regraService.atualizarRegra(regra).subscribe(data => {
        if(data !== null){
          this.pesquisarRegrasServico(regra.codServMedHosp.toString());
          this.msgsGrowl = [];
          this.msgsGrowl.push({severity:'info', summary:'', detail:'Regra reativada com sucesso!'});
        }
      }, error => {
          console.log(error);
          this.msgsGrowl = [];
          this.msgsGrowl.push({severity:'info', summary:'', detail:'Ocorreu um erro no servidor do Assistente! Favor contactar TI para suporte!'});
      });
     }
   });
 }

 findIndexToUpdate(item) { 
  return item.id === this;
 }

 confirmExcluir(regra: Regra){
  this.confirmationService.confirm({
    message: 'Deseja realmente excluir a regra ' + regra.intents + ' do serviço ' + regra.codServMedHosp + '?',
    header: 'Confirmar Excluir',
    icon: 'fa fa-info-circle',
    accept: () => {
      this.loading = true;
      // let  item = this.servCriticaAutorizacao.find(this.findIndexToUpdate, regra.id);
      // let index =  this.servCriticaAutorizacao.indexOf(regra);

      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth();
      let year = currentDate.getFullYear();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let seconds = currentDate.getSeconds();

      let dataExclusao = this.pad(day) + '/' + this.pad(month + 1) + '/' + year + ' ' + this.pad(hours) + ':' + this.pad(minutes) + ':' + this.pad(seconds);

      // item.dataExclusao = dataExclusao;
      // this.servCriticaAutorizacao[index] = item;

      regra.dataExclusao = dataExclusao;
      this.regraService.atualizarRegra(regra).subscribe(data => {
        if(data !== null){
          this.pesquisarRegrasServico(regra.codServMedHosp.toString());
          this.msgsGrowl = [];
          this.msgsGrowl.push({severity:'info', summary:'', detail:'Regra excluída com sucesso!'});
        }
      }, error => {
          console.log(error);
          this.msgsGrowl = [];
          this.msgsGrowl.push({severity:'info', summary:'', detail:'Ocorreu um erro no servidor do Assistente! Favor contactar TI para suporte!'});
      });
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
    codigoUnimed: AppComponent.COD_UNIMED_FORTALEZA,
    selectedIntent: null,
    qtdPermitida: null,
  });

  this.servCriticaAutorizacao = [];
 }

 flgLogado(): boolean{
  if(!NavbarComponent.flgLogado){
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'', detail:'Login não efetuado! Favor  <a href="http://localhost:4200">realizar login</a> para acessar página!'});
  } 
  return NavbarComponent.flgLogado;
 }

 numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
 }

}