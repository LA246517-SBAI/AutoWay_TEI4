import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { UserService, User } from '../service/user.service';
import { AdminUserFormDialogComponent } from './admin-user-form-dialog/admin-user-form-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    HeaderComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'username', 'name', 'email', 'roles', 'actions'];
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = null;
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs:', err);
        this.errorMessage = 'Erreur lors du chargement des utilisateurs.';
        this.loading = false;
      }
    });
  }

  openUserForm(user?: User): void {
    const dialogRef = this.dialog.open(AdminUserFormDialogComponent, {
      width: '500px',
      data: user || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(id: number | undefined): void {
    if (!id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          this.errorMessage = 'Erreur lors de la suppression de l\'utilisateur.';
        }
      });
    }
  }

  getRolesBadgeClass(roles: string[] | undefined): string {
    if (!roles) return 'role-client';
    if (roles.includes('admin') || roles.includes('Admin')) return 'role-admin';
    return 'role-client';
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/connexion']);
  }
}
