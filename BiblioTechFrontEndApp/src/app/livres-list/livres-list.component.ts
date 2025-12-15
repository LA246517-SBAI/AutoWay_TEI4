import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LivreService } from '../service/livre.service';
import { CategorieService } from '../service/categorie-service';
import { UserService } from '../service/user.service';
import { EmpruntService } from '../service/emprunt.service';
import { Livre } from '../interface/Livre';
import { Categorie } from '../interface/Categorie';
import { Emprunt } from '../interface/Emprunt';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-livres-list',
  standalone: true,
  templateUrl: './livres-list.component.html',
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule, MatIconModule, NavbarComponent],
  providers: [LivreService, CategorieService, EmpruntService],
  styleUrls: ['./livres-list.component.css']
})
export class LivresListComponent implements OnInit {

  livres: Livre[] = [];
  categories: Categorie[] = [];
  selectedCategorieId: number | null = null;
  searchTitre: string = '';
  searchAuteur: string = '';
  isAdmin: boolean = false;
  private isBrowser: boolean;
  livresEmpruntes: Set<number> = new Set(); // IDs des livres déjà empruntés

  constructor(
    private livreService: LivreService,
    private categorieService: CategorieService,
    private userService: UserService,
    private empruntService: EmpruntService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadLivres();
    this.checkActiveRole();
    this.loadMesEmprunts();
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
    this.applyFilters();
  }

  applyFilters() {
    const categorieId = this.selectedCategorieId || undefined;
    const titre = this.searchTitre || undefined;
    const auteur = this.searchAuteur || undefined;

    this.livreService.getAll(categorieId, titre, auteur).subscribe(data => {
      this.livres = data;
    });
  }

  clearFilters() {
    this.selectedCategorieId = null;
    this.searchTitre = '';
    this.searchAuteur = '';
    this.loadLivres();
  }

  loadMesEmprunts(): void {
    if (!this.isBrowser || this.isAdmin) return; // Les admins ne peuvent pas emprunter

    this.empruntService.getMesEmprunts().subscribe({
      next: (emprunts: Emprunt[]) => {
        this.livresEmpruntes = new Set(emprunts.map(e => e.livreId));
      },
      error: (err) => {
        // Si l'utilisateur n'est pas connecté, on ignore l'erreur
        if (err.status !== 401) {
          console.error('Erreur lors du chargement des emprunts:', err);
        }
      }
    });
  }

  isLivreDejaEmprunte(livreId: number): boolean {
    return this.livresEmpruntes.has(livreId);
  }

  emprunterLivre(livre: Livre): void {
    if (livre.nbExemplaires === 0) {
      alert("Ce livre n'est pas disponible.");
      return;
    }

    if (this.isLivreDejaEmprunte(livre.id)) {
      alert("Vous avez déjà emprunté ce livre.");
      return;
    }

    this.empruntService.emprunterLivre(livre.id).subscribe({
      next: () => {
        this.livresEmpruntes.add(livre.id);
        livre.nbExemplaires--; // Décrémenter le nombre d'exemplaires
        alert("Livre emprunté avec succès !");
      },
      error: (err) => {
        if (err.status === 400) {
          alert(err.error || "Impossible d'emprunter ce livre.");
        } else if (err.status === 401) {
          alert("Vous devez être connecté pour emprunter un livre.");
        } else {
          alert("Erreur lors de l'emprunt du livre.");
        }
      }
    });
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
