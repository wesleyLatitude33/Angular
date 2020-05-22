import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import {HttpClientModule} from '@angular/common/http';

import { OrdemServicoRoutingModule } from './ordem-servico-routing.module';
import { PedidoComponent } from './pedido/pedido.component';
import { ExamesComponent } from './exames/exames.component';
import { ProtocoloComponent } from './protocolo/protocolo.component';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { RodapeComponent } from '../rodape/rodape.component';


@NgModule({
  declarations: [
    PedidoComponent, 
    ExamesComponent, 
    ProtocoloComponent,
    CabecalhoComponent,
    RodapeComponent
  ],
  imports: [
    CommonModule,
    OrdemServicoRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class OrdemServicoModule { }
