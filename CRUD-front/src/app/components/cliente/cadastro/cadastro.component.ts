import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  clienteForm: FormGroup

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.clienteForm = this.formBuilder.group({
      razao_social: ['', [Validators.required]],
      natureza: ['', [Validators.required]],
      pj_cnpj: ['', [Validators.required]],
      pf_cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required]]
    })
  }

  criarCliente() {
    if (this.clienteForm.invalid) {
      this.toastr.error('Por favor, preencha todos os campos corretamente.', 'Erro ao criar cliente:')
      return
    }

    this.clienteService.criarCliente(this.clienteForm.value).subscribe(
      (data: any) => {
        this.toastr.success('Cliente criado com sucesso!')
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.toastr.error(error, 'Erro ao criar cliente:')
      }
    );
  }
}
