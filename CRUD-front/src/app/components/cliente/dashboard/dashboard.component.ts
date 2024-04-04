import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  clientes: any[] = []; // Array de clientes

  constructor(
    private router: Router, 
    // private clienteService: ClienteService
    ) {}

  ngOnInit(): void {
    // Simulação: carregar clientes do serviço ao inicializar o componente
    // this.clientes = this.clienteService.getClientes();
  }

  criarCliente() {
    // Redirecionar para a página de criação de cliente
    this.router.navigate(['/criar-cliente']);
  }

  verDetalhesCliente(clienteId: number) {
    // Redirecionar para a página de detalhes do cliente com o ID específico
    this.router.navigate(['/detalhes-cliente', clienteId]);
  }
}
