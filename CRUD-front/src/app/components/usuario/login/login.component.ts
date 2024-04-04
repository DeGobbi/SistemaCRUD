import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

import { NavbarComponent } from '../../navbar/navbar.component';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NavbarComponent, 
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.usuarioForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  logarUsuario() {
    if (this.usuarioForm.invalid) {
      this.toastr.error('Por favor, preencha todos os campos corretamente.', 'Erro ao logar')
      return
    }
    this.usuarioService.logarUsuario(this.usuarioForm.value).subscribe(
      (data: any) => {
        this.cookieService.set('Bearer', data.token);
        this.router.navigate(['/'])
        this.toastr.success('Logado com sucesso!');
      },
      (error: any) => {
        this.toastr.error(error.error, 'Erro ao logar:');
      }
    )
  }
}