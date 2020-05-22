import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoComponent } from './pedido/pedido.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProtocoloComponent } from './protocolo/protocolo.component';


const routes: Routes = [
  {
    path: 'os',
    component: PedidoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'protocoloOs',
    component: ProtocoloComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdemServicoRoutingModule { }
