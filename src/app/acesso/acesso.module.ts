import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AcessoRoutingModule } from './acesso-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AcessoRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class AcessoModule { }
