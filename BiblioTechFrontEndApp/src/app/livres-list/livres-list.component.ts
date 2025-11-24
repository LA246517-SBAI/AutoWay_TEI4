import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { LivreService } from '../service/livre.service';
import { CategorieService } from '../service/categorie-service';
import { Livre } from '../interface/Livre';
import { Categorie } from '../interface/Categorie';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livres-list',
  standalone: true,
  templateUrl: './livres-list.component.html',
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule],
  providers: [LivreService, CategorieService],
  styleUrls: ['./livres-list.component.css']
})
export class LivresListComponent implements OnInit {

  livres: Livre[] = [];
  categories: Categorie[] = [];
  selectedCategorieId: number | null = null;
  isAdmin: boolean = false;

  constructor(
    private livreService: LivreService,
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadLivres();
    
    // TODO: Remplacer par le vrai check de rôle utilisateur
    this.isAdmin = false;
  }

  loadCategories() {
    this.categorieService.getAll().subscribe(data => {
      this.categories = data;
    });
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

  deleteLivre(livre: Livre) {
    if (!confirm("Voulez-vous vraiment supprimer ce livre ?")) return;

    this.livreService.delete(livre.id).subscribe(() => {
      this.livres = this.livres.filter(l => l.id !== livre.id);
    });
  }
}
