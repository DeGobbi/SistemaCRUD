import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  isLoggedIn = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(
      (data: any) => {
        this.isLoggedIn = true;
        console.log(data)
      },
      (error: any) => {
        this.isLoggedIn = false;
      }
    );
  }

  logout() {
    this.authService.logout()
  }
}
