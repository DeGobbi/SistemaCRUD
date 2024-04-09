import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent {
  usuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.usuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      senhaConfirmacao: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(
      () => {
        this.router.navigate(['/'])
      },
      (error: any) => {}
    );
  }

  esvaziarInputs() {
    this.usuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      senhaConfirmacao: ['', Validators.required]
    });
  }

  criarUsuario() {
    if (this.usuarioForm.invalid) {
      this.toastr.error('Por favor, preencha todos os campos corretamente.', 'Erro ao criar usuário:')
      return
    }
    
    const { senha, senhaConfirmacao } = this.usuarioForm.value;
    if (senha !== senhaConfirmacao) {
      this.toastr.error('As senhas devem estar compatíveis', 'Erro ao criar usuário:');
      return;
    }

    this.usuarioService.criarUsuario(this.usuarioForm.value).subscribe(
      () => {
        this.toastr.success('Usuário criado com sucesso!');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastr.error(error.error, 'Erro ao criar usuário:');
        this.esvaziarInputs()
      }
    );
  }
}
