import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { EmpruntService, EmpruntResponse } from '../service/emprunt.service';

@Component({
  selector: 'app-emprunts-list',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './emprunts-list.component.html',
  styleUrl: './emprunts-list.component.css'
})
export class EmpruntsListComponent implements OnInit {
  emprunts: EmpruntResponse[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.loadEmprunts();
  }

  loadEmprunts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.empruntService.getMesEmprunts().subscribe({
      next: (data) => {
        this.emprunts = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des emprunts:', err);
        this.errorMessage = 'Erreur lors du chargement de vos emprunts';
        this.isLoading = false;
      }
    });
  }

  retournerLivre(livreId: number, empruntId: number): void {
    if (confirm('Êtes-vous sûr de vouloir retourner ce livre ?')) {
      this.empruntService.retournerLivre(livreId).subscribe({
        next: (response) => {
          // Retirer l'emprunt de la liste
          this.emprunts = this.emprunts.filter(e => e.id !== empruntId);
          console.log('Livre retourné avec succès');
        },
        error: (err) => {
          console.error('Erreur lors du retour du livre:', err);
          alert('Erreur lors du retour du livre. Veuillez réessayer.');
        }
      });
    }
  }

  isEnRetard(dateRetourPrevue: string): boolean {
    const today = new Date();
    const datePrevu = new Date(dateRetourPrevue);
    return today > datePrevu;
  }
}

