import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

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
  clientes: any[] = [];

  constructor(
    private router: Router, 
    private clienteService: ClienteService
    ) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      (data: any) => {
        this.clientes = data
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  criarCliente() {
    this.router.navigate(['/criar-cliente']);
  }

  verDetalhesCliente(clienteId: number) {
    this.router.navigate(['/detalhes-cliente', clienteId]);
  }

  ordenarPorNomeAsc() {
    this.clientes.sort((a, b) => a.razao_social.localeCompare(b.razao_social));
  }

  ordenarPorNomeDesc() {
    this.clientes.sort((a, b) => b.razao_social.localeCompare(a.razao_social));
  }

  ordenarPorDataMaisRecente() {
    this.clientes.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  
  ordenarPorDataMaisAntiga() {
    this.clientes.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }
}
