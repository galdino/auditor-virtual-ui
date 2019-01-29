import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicoService } from '../service/servico.service';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-pdialog',
  templateUrl: './pdialog.component.html',
  styleUrls: ['./pdialog.component.css']
})

export class PdialogComponent implements OnInit {
  @Input() public tituloDialog: string;
  @Input() public display: boolean;
  @Output() displayChange = new EventEmitter();
  @Output() servicoChange = new EventEmitter();
  frmpesqservico: FormGroup;

  // servMedicos = [
  //   { codigo: 4080501, dig_verificador: 8, descricao_servico: 'TORAX - 1 INCIDENCIA'  },
  //   { codigo: 4020108, dig_verificador: 2, descricao_servico: 'COLONOSCOPIA (INCLUI A RETOSSIGMOIDOSCOPIA)'  },
  //   { codigo: 5699134, dig_verificador: 7, descricao_servico: 'CAMPIMETRO MONOCULAR'  },
  //   { codigo: 5799115, dig_verificador: 5, descricao_servico: 'CONSULTA CONSULTORIO (HORARIO NORMAL OU PREESTABELECIDO)' },
  //   { codigo: 4798415, dig_verificador: 2, descricao_servico: 'ECODOPPLERCARDIOGRAMA TRANSTORACICO' },
  //   { codigo: 4754516, dig_verificador: 4, descricao_servico: 'ECOBIOMETRO MONOCULAR' }
  // ];

  servMedicos = [];

  loading: boolean;

  msgsGrowl: Message[] = [];

  constructor(private fb: FormBuilder, private servicoService: ServicoService) { }

  ngOnInit() {
    this.frmpesqservico = this.fb.group({
      codigoServico: [null, null],
      descricaoServico: [null, null]
    });
  }

  onClose(){
    this.displayChange.emit(false);
  }

  ngOnDestroy(){
    this.displayChange.unsubscribe();
  }

  onSubmit(frmpesqservico: FormGroup){
    let codigoServico: string;
    let descricaoServico: string;
    
    codigoServico = frmpesqservico.value.codigoServico;
    descricaoServico = frmpesqservico.value.descricaoServico;

    if(codigoServico !== null || descricaoServico !== null){
      if(codigoServico === null){
        codigoServico = "";
      }

      if(descricaoServico === null){
        descricaoServico = "";
      }
      this.loading = true;
      this.servicoService.pesquisarServico(codigoServico, descricaoServico).subscribe(data => {
        this.servMedicos = data;
        this.loading = false;
      }, error => {
          console.log(error);
          this.msgsGrowl = [];
          this.msgsGrowl.push({severity:'info', summary:'', detail:'Ocorreu um erro no servidor do Assistente! Favor contactar TI para suporte!'});
      });
    }
  }

  selecionarServico(servico: any){
    this.servicoChange.emit(servico);    
    this.onClose();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
   }


}
