import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ClienteService } from '../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent {
  cliente: any;
  clienteId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id']

    if(this.clienteId === '0') {
      this.router.navigate(['/'])
      this.toastr.error('Cliente não encontrado', 'Erro ao buscar cliente:')
      return
    }

    this.clienteService.getCliente(this.clienteId).subscribe(
      (data: any) => {
        this.cliente = data;
      },
      (error: any) => {
        console.log(error)
        this.router.navigate(['/'])
        this.toastr.error('Cliente não encontrado', 'Erro ao buscar cliente:')
      }
    );
  }

  editarCliente() {
    this.router.navigate(['/editar-cliente', this.clienteId]);
  }

  excluirCliente() {
    this.clienteService.excluirCliente(this.clienteId).subscribe(
      (data: any) => {
        this.toastr.success('Cliente excluído com sucesso!')
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.toastr.error('Erro ao excluir cliente')
        this.router.navigate(['/']);
      }
  )}
}
