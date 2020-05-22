import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OrdemServicoModule } from './ordem-servico/ordem-servico.module';
import { AcessoModule } from './acesso/acesso.module';
import { UsuarioService } from './acesso/usuario.service';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrdemServicoModule,
    AcessoModule
  ],
  providers: [
    UsuarioService,
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
