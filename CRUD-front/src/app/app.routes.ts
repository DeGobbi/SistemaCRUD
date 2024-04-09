import { Routes } from '@angular/router';
import { CadastroComponent as CadastroUsuarioComponent } from './components/usuario/cadastro/cadastro.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent as CadastroClienteComponent} from './components/cliente/cadastro/cadastro.component';
import { DetalhesComponent as DetalhesClienteComponent} from './components/cliente/detalhes/detalhes.component';
import { EdicaoComponent as EdicaoClienteComponent } from './components/cliente/edicao/edicao.component';
import { AuthGuard } from './guards/auth.guard';
import { Erro404Component } from './components/erro-404/erro-404.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastrar', component: CadastroUsuarioComponent },
  { path: 'login', component: LoginComponent},
  { path: 'criar-cliente', component: CadastroClienteComponent, canActivate: [AuthGuard]},
  { path: 'detalhes-cliente/:id', component: DetalhesClienteComponent, canActivate: [AuthGuard]},
  { path: 'editar-cliente/:id', component: EdicaoClienteComponent, canActivate: [AuthGuard]},
  { path: '**', component: Erro404Component}
];