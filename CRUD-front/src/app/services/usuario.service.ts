import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {

  constructor(private http: HttpClient) { }

  criarUsuario(usuarioData: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/usuarios/cadastrar', usuarioData);
  }

  logarUsuario(usuarioData: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/usuarios/login', usuarioData)
  }

}