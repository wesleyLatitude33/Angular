import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

  private fazerLogin(){
    this.usuarioService.login(this.usuario);
  }

}
