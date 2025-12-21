import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { EmpruntService } from '../service/emprunt.service';
import { Emprunt } from '../interface/Emprunt';

@Component({
  selector: 'app-mon-historique',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './mon-historique.component.html',
  styleUrls: ['./mon-historique.component.css']
})
export class MonHistoriqueComponent implements OnInit {
  emprunts: Emprunt[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.loadHistorique();
  }

  loadHistorique(): void {
    this.loading = true;
    this.errorMessage = null;
    this.empruntService.getMonHistorique().subscribe({
      next: (data: Emprunt[]) => {
        this.emprunts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'historique:', err);
        this.errorMessage = 'Erreur lors du chargement de votre historique.';
        this.loading = false;
      }
    });
  }

  isRendu(emprunt: Emprunt): boolean {
    return emprunt.dateRetourEffective !== null;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
