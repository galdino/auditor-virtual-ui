import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Regra } from '../model/regra';

@Component({
  selector: 'app-pdialogalterar',
  templateUrl: './pdialogalterar.component.html',
  styleUrls: ['./pdialogalterar.component.css']
})
export class PdialogalterarComponent implements OnInit {

  @Input() public tituloDialog: string;
  @Input() public displayAltRegra: boolean;
  @Input() public selectedRegra: Regra;
  @Output() displayAltRegraChange = new EventEmitter();
  @Output() regraChange = new EventEmitter();

  frmaltregra: FormGroup;

  constructor(private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.frmaltregra = this.fb.group({
      quantidade_permitida: [null, [Validators.required]]
    });
  }

  onSubmit(){
    let servCriticaAutorizacaoItensAux = { id: this.selectedRegra.id, cod_serv: this.selectedRegra.codServMedHosp, intents: this.selectedRegra.intents, data_inclusao: this.selectedRegra.dataInclusao, data_exclusao: this.selectedRegra.dataExclusao, quantidade_permitida: this.frmaltregra.value.quantidade_permitida };
    this.regraChange.emit(servCriticaAutorizacaoItensAux);
    this.frmaltregra.reset();
    this.onClose();
  }

  onClose(){
    this.displayAltRegraChange.emit(false);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
