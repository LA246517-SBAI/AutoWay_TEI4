import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { EmpruntService } from '../service/emprunt.service';
import { Emprunt } from '../interface/Emprunt';

@Component({
  selector: 'app-mes-emprunts',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './mes-emprunts.component.html',
  styleUrls: ['./mes-emprunts.component.css']
})
export class MesEmpruntsComponent implements OnInit {
  emprunts: Emprunt[] = [];
  loading = true;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.loadEmprunts();
  }

  loadEmprunts(): void {
    this.loading = true;
    this.errorMessage = null;
    this.empruntService.getMesEmprunts().subscribe({
      next: (data: Emprunt[]) => {
        this.emprunts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des emprunts:', err);
        this.errorMessage = 'Erreur lors du chargement de vos emprunts.';
        this.loading = false;
      }
    });
  }

  retournerLivre(emprunt: Emprunt): void {
    this.errorMessage = null;
    this.successMessage = null;

    this.empruntService.retournerLivre(emprunt.livreId).subscribe({
      next: () => {
        this.successMessage = `Le livre "${emprunt.livre?.titre}" a été retourné avec succès.`;
        this.loadEmprunts();
      },
      error: (err) => {
        console.error('Erreur lors du retour du livre:', err);
        this.errorMessage = 'Erreur lors du retour du livre.';
      }
    });
  }

  isEnRetard(emprunt: Emprunt): boolean {
    const today = new Date();
    const dateRetourPrevue = new Date(emprunt.dateRetourPrevue);
    return today > dateRetourPrevue;
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
