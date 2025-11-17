import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // <-- IMPORTANT
import { CategorieService } from '../service/categorie-service';
import { Categorie } from '../interface/Categorie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorie-list',
  standalone: true,
  templateUrl: './categorie-list.component.html',
  imports: [CommonModule, HttpClientModule, RouterLink], // <-- ajoute HttpClientModule ici
  providers: [CategorieService]
})
export class CategorieListComponent implements OnInit {

  categories: Categorie[] = [];
  error = '';

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
  this.categorieService.getAll().subscribe({
    next: data => this.categories = data,
    error: err => {
      console.error('Erreur HTTP:', err); // <-- Ici on affiche tous les détails
      this.error = 'Erreur chargement catégories';
    }
  });
}

  deleteCategorie(cat: Categorie) {
    if (cat.livres && cat.livres.length > 0) {
      alert(`Impossible : cette catégorie contient ${cat.livres.length} livre(s).`);
      return;
    }

    if (!confirm("Supprimer cette catégorie ?")) return;

    this.categorieService.delete(cat.id).subscribe({
      next: () => this.load(),
      error: err => alert(err.error || "Erreur suppression")
    });
  }
}
