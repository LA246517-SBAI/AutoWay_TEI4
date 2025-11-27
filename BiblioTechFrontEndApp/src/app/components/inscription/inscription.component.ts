import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../service/user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  hidePassword = true;
  hideConfirm = true;

  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.signupForm.invalid) {
      return; // arrête si le formulaire n'est pas valide
    }

    const { firstName, lastName, email, password, confirmPassword } = this.signupForm.value;

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    const user: User = {
      name: lastName!,
      username: firstName!,
      email: email!,
      password: password!,
      roles: ["User"]
    };

    this.userService.register(user).subscribe({
      next: (res) => {
        alert("Inscription réussie !");
        this.router.navigate(['/']); // redirige vers la page de connexion
      },
      error: (err) => {
        alert(err.error || "Une erreur est survenue lors de l'inscription.");
      }
    });
  }
}
