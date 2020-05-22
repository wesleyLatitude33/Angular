import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Exame } from 'src/app/model/Exame';
import { OrdemServicoExame } from '../model/OrdemServicoExame';
import { OrdemServico } from '../model/OrdemServico';
import { ConvenioService } from 'src/app/service/convenio.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { MedicoService } from 'src/app/service/medico.service';
import { OrdemServicoService } from '../service/ordem-servico.service';
import { UsuarioService } from 'src/app/acesso/usuario.service';
import { PostoColetaService } from 'src/app/service/posto-coleta.service';
import { Router } from '@angular/router';
import { ExameService } from 'src/app/service/exame.service';
import { OrdemServicoItemService } from '../service/ordem-servico-item.service';

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.css']
})
export class ExamesComponent implements OnInit {

  private exames : Exame[];
  private exame = new Exame();
  private ordemServicoexame = new OrdemServicoExame()
  private ordemServicoexames: any[] = [];

  @Input() item_ordemServico: OrdemServico;
  
  private totalOrdemServico: number;
  private totalOSFormat: String;

  resultadoExame(){ 
    var hoje = new Date();
    hoje.setDate(hoje.getDate() + this.exame.diasResultado);
    
    this.ordemServicoexame.dataResultado = this.datePipe.transform(hoje, 'yyyy-MM-dd');
    this.ordemServicoexame.preco = this.exame.preco;
  }

  constructor(private ordemServicoItemService:OrdemServicoItemService,
    private exameService:ExameService,
    private datePipe: DatePipe) { 
      this.totalOrdemServico = 0;
}

  ngOnInit() {
    this.buscarExames();
  }
  /*******************************/
  /*          MÉTODOS            */
  /*******************************/

  gravarExame(){
    
    this.ordemServicoexame.exameId = this.exame.id;
    this.ordemServicoexame.ordemServicoId = this.item_ordemServico.id;

    this.calculaTotalOS(this.ordemServicoexame, "+");

    this.ordemServicoItemService.criar(this.ordemServicoexame).subscribe((ordemServicoExame: OrdemServicoExame) => {
                ordemServicoExame.dataResultado = this.datePipe.transform(ordemServicoExame.dataResultado, 'dd/MM/yyyy');
          this.ordemServicoexames.push(ordemServicoExame);
          this.ordemServicoItemService.setOrdemServicoExames(this.ordemServicoexames);
    });
}

excluirExame(oSExame: OrdemServicoExame){

this.calculaTotalOS(oSExame, "-");

var element = oSExame;
var indice = this.ordemServicoexames.lastIndexOf(element)
this.ordemServicoexames.splice(indice,1);

this.ordemServicoItemService.setOrdemServicoExames(this.ordemServicoexames);

this.ordemServicoItemService.excluir(oSExame).subscribe();
}

buscarExamesOs(){
this.ordemServicoItemService.getPorOS(this.item_ordemServico.id).subscribe((exames: OrdemServicoExame[]) => {
    this.ordemServicoexames = exames;
})
}

buscarExames(){
this.exameService.getTodos().subscribe((exames: Exame[]) => {
  this.exames = exames;
})
}

calculaTotalOS(ordemServicoexame: OrdemServicoExame, tipo:string){
let v1, v2, tot : number;
v1 = parseFloat(this.totalOrdemServico.toString());
v2 = parseFloat(ordemServicoexame.preco.toString());

if (tipo == "+")
  tot = v1 + v2;
else
  tot = v1 - v2;

this.totalOrdemServico = tot;
this.totalOSFormat = this.totalOrdemServico.toLocaleString('pt-BR', 
                                          { style: 'currency', currency: 'BRL' });
}

}
