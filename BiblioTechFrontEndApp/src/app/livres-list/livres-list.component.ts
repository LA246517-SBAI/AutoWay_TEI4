import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LivreService } from '../service/livre.service';
import { CategorieService } from '../service/categorie-service';
import { UserService } from '../service/user.service';
import { Livre } from '../interface/Livre';
import { Categorie } from '../interface/Categorie';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-livres-list',
  standalone: true,
  templateUrl: './livres-list.component.html',
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule, MatIconModule, NavbarComponent],
  providers: [LivreService, CategorieService],
  styleUrls: ['./livres-list.component.css']
})
export class LivresListComponent implements OnInit {

  livres: Livre[] = [];
  categories: Categorie[] = [];
  selectedCategorieId: number | null = null;
  isAdmin: boolean = false;
  private isBrowser: boolean;

  constructor(
    private livreService: LivreService,
    private categorieService: CategorieService,
    private userService: UserService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadLivres();
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

  loadCategories() {
    this.categorieService.getAll().subscribe(data => {
      this.categories = data;
    });
  }
  getCategorieNom(id: number): string {
  const cat = this.categories.find(c => c.id === id);
  return cat ? cat.nom : 'Non définie';
  }


  loadLivres() {
    this.livreService.getAll().subscribe(data => {
      this.livres = data;
    });
  }

  filterByCategorie() {
    if (!this.selectedCategorieId) {
      this.loadLivres(); // Toutes les catégories
    } else {
      this.livreService.getAll(this.selectedCategorieId).subscribe(data => {
        this.livres = data;
      });
    }
  }

  deleteLivre(livre: Livre): void {
    if (!confirm("Voulez-vous vraiment supprimer ce livre ?")) return;

    this.livreService.delete(livre.id).subscribe({
      next: () => {
        this.livres = this.livres.filter(l => l.id !== livre.id);
      },
      error: (err) => {
        if (err.status === 400) {
          alert("Impossible de supprimer ce livre car il est référencé ailleurs.");
        } else if (err.status === 401 || err.status === 403) {
          alert("Vous n'avez pas les droits pour effectuer cette action.");
        } else {
          alert("Erreur lors de la suppression du livre.");
        }
      }
    });
  }
}
