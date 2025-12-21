// categorie-list.component.ts
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
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
  imports: [CommonModule, RouterLink, MatIconModule, NavbarComponent],
  styleUrl: './categorie-list.component.css'
})
export class CategorieListComponent implements OnInit {
  categories: Categorie[] = [];
  isAdmin: boolean = false;
  private isBrowser: boolean;

  constructor(
    private categorieService: CategorieService,
    private userService: UserService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.categorieService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur chargement catégories:', err);
      }
    });

    this.checkActiveRole();
  }

  checkActiveRole(): void {
    if (!this.isBrowser) {
      this.isAdmin = false;
      return;
    }

    const activeRole = localStorage.getItem('activeRole');
    if (activeRole) {
      this.isAdmin = activeRole.toLowerCase() === 'admin';
    } else {
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