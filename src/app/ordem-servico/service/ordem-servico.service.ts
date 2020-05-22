import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';

import { OrdemServico } from '../model/OrdemServico';
import { UsuarioService } from 'src/app/acesso/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  constructor(private http:HttpClient,
    private usuario:UsuarioService) {
      
     }

  // Headers

  token = 'Bearer '+this.usuario.getToken();

  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                        'Accept' : 'application/json',
                      'Validate' : this.token}),
  }
  private ordemAtual: any;

  criar(ordemServico: OrdemServico){
    ordemServico.dataRetirada = null;
    console.log(ordemServico);
    return this.http.post('/api/ordemServicos', ordemServico,this.httpOptions);
  }

  atualizar(ordemServico: OrdemServico): Observable<any>{
    return this.http.put<any>('/api/ordemServicos/'+ordemServico.id, ordemServico, this.httpOptions);
  }

  public getOrdemAtual():any{
    return this.ordemAtual;
  }
  public setOrdemAtual(ordem : any){
    this.ordemAtual = ordem;
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
