// categorie-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CategorieService } from '../service/categorie-service';
import { Categorie } from '../interface/Categorie';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-categorie-list',
  standalone: true,
  templateUrl: './categorie-list.component.html',
  imports: [CommonModule, HttpClientModule, RouterLink, MatIconModule, NavbarComponent],
  providers: [CategorieService],
  styleUrl: './categorie-list.component.css'
})
export class CategorieListComponent implements OnInit {
  categories: Categorie[] = [];
  isAdmin: boolean = false;

  constructor(
    private categorieService: CategorieService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.categorieService.getAll().subscribe(data => {
      this.categories = data;
    });

    // Vérifier le rôle actif (pas juste si l'utilisateur EST admin)
    this.checkActiveRole();
  }

  checkActiveRole(): void {
    const activeRole = localStorage.getItem('activeRole');
    if (activeRole) {
      this.isAdmin = activeRole.toLowerCase() === 'admin';
    } else {
      // Si pas de rôle actif stocké, utiliser isAdmin du service
      this.isAdmin = this.userService.isAdmin();
    }
  }

  deleteCategorie(categorie: Categorie): void {
    if (!confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;

    this.categorieService.delete(categorie.id).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c.id !== categorie.id);
      },
      error: (err) => {
        if (err.status === 400) {
          alert("Impossible de supprimer une catégorie qui contient des livres.");
        } else if (err.status === 401 || err.status === 403) {
          alert("Vous n'avez pas les droits pour effectuer cette action.");
        }
      }
    });
  }
}