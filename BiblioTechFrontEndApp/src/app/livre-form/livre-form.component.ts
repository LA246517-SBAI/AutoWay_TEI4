import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { LivreService } from '../service/livre.service';
import { CategorieService } from '../service/categorie-service';
import { Livre } from '../interface/Livre';
import { Categorie } from '../interface/Categorie';

@Component({
  selector: 'app-livre-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    NavbarComponent
  ],
  templateUrl: './livre-form.component.html',
  styleUrl: './livre-form.component.css'
})
export class LivreFormComponent implements OnInit {
  livre: any = {
    id: 0,
    titre: '',
    auteur: '',
    annee: new Date().getFullYear(),
    nbExemplaires: 1,
    categorieId: null,
    categorie: { id: 0, nom: '' }
  };

  categories: Categorie[] = [];
  isEditMode = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private livreService: LivreService,
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadLivre(+id);
    }
  }

  loadCategories(): void {
    this.categorieService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur chargement catégories:', err);
        this.errorMessage = 'Erreur lors du chargement des catégories';
      }
    });
  }

  loadLivre(id: number): void {
    this.livreService.getById(id).subscribe({
      next: (data) => {
        this.livre = data;
      },
      error: (err) => {
        console.error('Erreur chargement livre:', err);
        this.errorMessage = 'Erreur lors du chargement du livre';
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Créer un objet pour l'API sans la propriété 'categorie'
    const livreData = {
      id: this.livre.id,
      titre: this.livre.titre,
      auteur: this.livre.auteur,
      annee: this.livre.annee,
      nbExemplaires: this.livre.nbExemplaires,
      categorieId: this.livre.categorieId
    };

    if (this.isEditMode) {
      this.livreService.update(this.livre.id, livreData as Livre).subscribe({
        next: () => {
          this.successMessage = 'Livre modifié avec succès';
          setTimeout(() => this.router.navigate(['/livres']), 1500);
        },
        error: (err) => {
          console.error('Erreur modification:', err);
          this.errorMessage = 'Erreur lors de la modification du livre';
        }
      });
    } else {
      console.log('Données envoyées au backend:', livreData);
      this.livreService.create(livreData as Livre).subscribe({
        next: () => {
          this.successMessage = 'Livre ajouté avec succès';
          setTimeout(() => this.router.navigate(['/livres']), 1500);
        },
        error: (err) => {
          console.error('Erreur création complète:', err);
          if (err.status === 401 || err.status === 403) {
            this.errorMessage = "Vous n'avez pas les droits pour effectuer cette action.";
          } else if (err.status === 400) {
            this.errorMessage = err.error || 'Données invalides. Vérifiez que la catégorie est sélectionnée.';
          } else {
            this.errorMessage = 'Erreur lors de la création du livre: ' + (err.error || err.message);
          }
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/livres']);
  }
}
