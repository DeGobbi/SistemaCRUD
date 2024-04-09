import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edicao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.css'
})

export class EdicaoComponent {
  clienteForm: FormGroup
  clienteId: any;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.clienteForm = this.formBuilder.group({
      razao_social: ['', [Validators.required]],
      natureza: ['', [Validators.required]],
      pj_cnpj: ['', [Validators.required]],
      pf_cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id']

    if(this.clienteId === '0') {
      this.router.navigate(['/'])
      this.toastr.error('Cliente não encontrado', 'Erro ao editar cliente:')
      return
    }

    this.clienteService.getCliente(this.clienteId).subscribe(
      (data: any) => {
        this.clienteForm.patchValue({
          razao_social: data.razao_social,
          natureza: data.natureza,
          pj_cnpj: data.pj_cnpj,
          pf_cpf: data.pf_cpf,
          telefone: data.telefone,
          id: this.clienteId
        });
      },
      (error: any) => {
        this.router.navigate(['/'])
        this.toastr.error('Cliente não encontrado', 'Erro ao editar cliente:')
      }
    );
  }

  voltar(id: any) {
    this.router.navigate([`/detalhes-cliente/${id}`])
  }

  editarCliente() {
    if (this.clienteForm.invalid) {
      this.toastr.error('Por favor, preencha todos os campos corretamente.', 'Erro ao editar cliente:')
      return
    }

    this.clienteService.editarCliente(this.clienteForm.value, this.clienteId).subscribe(
      (data: any) => {
        this.toastr.success('Cliente editado com sucesso!')
        this.router.navigate([`/detalhes-cliente/${this.clienteId}`]);
      },
      (error: any) => {
        this.toastr.error('Erro ao editar cliente')
        this.router.navigate([`/detalhes-cliente/${this.clienteId}`]);
      }
    );
  }
}