import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from './Usuario';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioAutenticado: boolean = false;
  private usuario: Usuario = new Usuario();
  private token: string;

  constructor(private http:HttpClient,
    private router: Router) { }

  validarUsuario(login: Usuario) {
      return this.http.post('/api/login',login);
  }

  login (login: Usuario){
    this.validarUsuario(login)
    .subscribe((login: any) => {
      this.token = login.acces_token;
      this.usuario.usuario = login.login;
      this.usuario.postoColetaId = login.postoColetaId;
      this.usuario.nome = login.nome;
      this.usuario.id = login.id;
      
      this.usuarioAutenticado = true;
      this.router.navigate(['os']);
    });
  }

  public getUsuario():Usuario{
    return this.usuario;
  }

  public getToken(){
    return this.token;
  }

  getUsuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

  getUsuarioLogado():Usuario{
    return this.usuario;
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
  
}
