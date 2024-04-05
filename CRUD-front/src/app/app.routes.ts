import { Routes } from '@angular/router';
import { CadastroComponent as CadastroUsuarioComponent } from './components/usuario/cadastro/cadastro.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent as CadastroClienteComponent} from './components/cliente/cadastro/cadastro.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastrar', component: CadastroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'criar-cliente', component: CadastroClienteComponent, canActivate: [AuthGuard]}
];