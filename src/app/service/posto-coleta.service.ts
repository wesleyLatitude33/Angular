import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { PostoColeta } from '../model/PostoColeta';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UsuarioService } from '../acesso/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class PostoColetaService {

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

  getPorId(id : number): Observable<PostoColeta> {
    return this.http.get<PostoColeta>('/api/postoColetas\/'+id,this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
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
