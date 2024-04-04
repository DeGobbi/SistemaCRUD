import { Routes } from '@angular/router';
import { CadastroComponent } from './components/usuario/cadastro/cadastro.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastrar', component: CadastroComponent },
  { path: 'login', component: LoginComponent }
];