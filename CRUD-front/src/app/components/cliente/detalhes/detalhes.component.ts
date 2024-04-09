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
    const clienteId = this.route.snapshot.params['id']

    if(clienteId === '0') {
      this.router.navigate(['/'])
      this.toastr.error('Cliente não encontrado', 'Erro ao buscar cliente:')
      return
    }

    this.clienteService.getCliente(clienteId).subscribe(
      (data: any) => {
        this.cliente = data;
      },
      (error: any) => {
        this.router.navigate(['/'])
        this.toastr.error('Cliente não encontrado', 'Erro ao buscar cliente:')
      }
    );
  }

  editarCliente(id: any) {
    // Navegar para a página de edição do cliente
    // this.router.navigate(['/editar-cliente', this.clienteId]);
  }

  excluirCliente() {
    // Aqui você pode implementar a lógica para excluir o cliente
  }
}
