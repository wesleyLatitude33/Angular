import { Component, OnInit } from '@angular/core';
import { OrdemServicoExame } from '../model/OrdemServicoExame';
import { OrdemServicoService } from '../service/ordem-servico.service';
import { OrdemServicoItemService } from '../service/ordem-servico-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protocolo',
  templateUrl: './protocolo.component.html',
  styleUrls: ['./protocolo.component.css']
})
export class ProtocoloComponent implements OnInit {

  private ordemServicoexames: any[] = [];
  private ordemServico: any;

  constructor(private ordemServicoService: OrdemServicoService,
              private ordemServicoItemService: OrdemServicoItemService,
              private router: Router) { 

    this.ordemServicoexames = this.ordemServicoItemService.getOrdemServicoExames();
    this.ordemServico = this.ordemServicoService.getOrdemAtual();

    let total :number = 0;
    for (var val of this.ordemServicoexames){
        total += parseFloat(val.preco.toString());
    }

    this.ordemServico.total = total.toLocaleString('pt-BR', 
                            { style: 'currency', currency: 'BRL' });;
    
  }

  ngOnInit() {
  }

  private novaOs(){
    let ordem : OrdemServicoExame[];
    let atual : any;
    this.ordemServicoItemService.setOrdemServicoExames(ordem);
    this.ordemServicoService.setOrdemAtual(atual);
    this.router.navigate(['pedido']);
  }

}
