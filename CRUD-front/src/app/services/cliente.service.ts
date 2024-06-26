import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  clientes: any

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  
  getClientes(): Observable<any> {
    return this.authService.isLoggedIn().pipe(
      switchMap((data: any) => {
        if (data && data.id) {
          return this.http.get<any>(`http://localhost:3000/clientes`, { withCredentials: true });
        } else {
          return of(null); // Ou retorne throwError('Erro de autenticação') se preferir lançar um erro
        }
      })
    );
  }

  getCliente(clienteId: string): Observable<any> {
    return this.authService.isLoggedIn().pipe(
      switchMap((data: any) => {
        if (data && data.id) {
          return this.http.get<any>(`http://localhost:3000/clientes?clienteId=${clienteId}`, { withCredentials: true });
        } else {
          return of(null); // Ou retorne throwError('Erro de autenticação') se preferir lançar um erro
        }
      })
    );
  }

  criarCliente(clienteData: any): Observable<any> {
    return this.authService.isLoggedIn().pipe(
      switchMap((data: any) => {
        if (data && data.id) {
          return this.http.post<any>('http://localhost:3000/clientes', clienteData, { withCredentials: true });
        } else {
          return of(null); // Ou retorne throwError('Erro de autenticação') se preferir lançar um erro
        }
      })
    );
  }

  editarCliente(clienteData: any, clienteId: any): Observable<any> {
    return this.authService.isLoggedIn().pipe(
      switchMap((data: any) => {
        if (data && data.id) {
          return this.http.put<any>('http://localhost:3000/clientes', { clienteData, clienteId }, { withCredentials: true });
        } else {
          return of(null); // Ou retorne throwError('Erro de autenticação') se preferir lançar um erro
        }
      })
    );
  }

  excluirCliente(clienteId: any): Observable<any> {
    return this.authService.isLoggedIn().pipe(
      switchMap((data: any) => {
        if (data && data.id) {
          return this.http.delete<any>(`http://localhost:3000/clientes?clienteId=${clienteId}`, { withCredentials: true });
        } else {
          return of(null); // Ou retorne throwError('Erro de autenticação') se preferir lançar um erro
        }
      })
    );
  }
}
