import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, LoginRequest, TokenResponse } from '../../service/user.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    HeaderComponent,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  hide = true;

  // champs du formulaire
  username: string = '';
  password: string = '';

  // pour afficher un message d'erreur simple
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = null;

    const credentials: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.userService.login(credentials).subscribe({
      next: (response: TokenResponse) => {
        // Stocker le token
        localStorage.setItem('token', response.token);
        this.router.navigate(['/livres']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
      }
    });
  }
}
