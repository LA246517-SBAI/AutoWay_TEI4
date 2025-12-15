import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { EmpruntService, EmpruntResponse } from '../service/emprunt.service';

@Component({
  selector: 'app-emprunts-historique',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './emprunts-historique.component.html',
  styleUrl: './emprunts-historique.component.css'
})
export class EmpruntsHistoriqueComponent implements OnInit {
  empruntsHistorique: EmpruntResponse[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.loadHistorique();
  }

  loadHistorique(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.empruntService.getMonHistorique().subscribe({
      next: (data) => {
        this.empruntsHistorique = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'historique:', err);
        this.errorMessage = 'Erreur lors du chargement de votre historique';
        this.isLoading = false;
      }
    });
  }

  isRetourneEffectif(dateRetourEffective: string | null): boolean {
    return dateRetourEffective != null;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }
}
