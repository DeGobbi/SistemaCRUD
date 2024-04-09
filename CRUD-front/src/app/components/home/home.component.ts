import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { DashboardComponent } from '../cliente/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    DashboardComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggedIn = false

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(
      (data: any) => {
        this.isLoggedIn = true;
      },
      (error: any) => {
        this.isLoggedIn = false;
        this.authService.logout()
      }
    );
  }
}
