import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcessoModule } from './acesso/acesso.module';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AcessoModule,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
