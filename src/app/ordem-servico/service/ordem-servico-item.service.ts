import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { OrdemServicoExame } from '../model/OrdemServicoExame';
import { UsuarioService } from 'src/app/acesso/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class OrdemServicoItemService {

  private ordemServicoExames : OrdemServicoExame[];

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

  criar(ordemServicoExame: OrdemServicoExame){
    return this.http.post('/api/ordemServicoExames', ordemServicoExame,this.httpOptions);
  }

  excluir(ordemServicoExame: OrdemServicoExame): Observable<any[]>{
    return this.http.request<any[]>('delete','/api/ordemServicoExames\/'+ordemServicoExame.id, 
                                    this.httpOptions);
  }
  
  getPorOS(id : number): Observable<OrdemServicoExame []> {
    return this.http.get<OrdemServicoExame[]>('/api/ordemServicoExames\/OS\/'+id,this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  public getOrdemServicoExames():OrdemServicoExame[]{
    return this.ordemServicoExames;
  }

  public setOrdemServicoExames(item : OrdemServicoExame[]){
    this.ordemServicoExames = item;
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
