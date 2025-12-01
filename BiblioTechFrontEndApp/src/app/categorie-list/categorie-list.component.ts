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
  providers: [CategorieService],
  styleUrl: './categorie-list.component.css'
})
export class CategorieListComponent implements OnInit {
  categories: any[] = [];
  isAdmin: boolean = false; // par défaut false

  constructor( private categorieService: CategorieService) {}

  ngOnInit(): void {
    // récupérer les catégories
    this.categorieService.getAll().subscribe(data => {
      this.categories = data;
    });

    // récupérer le rôle de l'utilisateur
    //this.isAdmin = this.authService.isUserAdmin(); 
    // isUserAdmin() doit renvoyer true si l'utilisateur connecté est admin
    this.isAdmin = true;
  }

  deleteCategorie(categorie: any) {
    if (!confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;

    this.categorieService.delete(categorie.id).subscribe(() => {
      this.categories = this.categories.filter(c => c.id !== categorie.id);
    });
  }
}

