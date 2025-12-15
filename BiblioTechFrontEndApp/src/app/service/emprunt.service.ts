import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprunt } from '../interface/Emprunt';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {
  private apiUrl = 'https://localhost:5001/api/Emprunts';

  constructor(private http: HttpClient) { }

  // Récupérer les emprunts actifs de l'utilisateur connecté
  getMesEmprunts(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${this.apiUrl}/mes-emprunts`);
  }

  // Récupérer l'historique complet des emprunts de l'utilisateur
  getMonHistorique(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${this.apiUrl}/mon-historique`);
  }

  // Retourner un livre
  retournerLivre(livreId: number): Observable<{ message: string; empruntId: number }> {
    return this.http.post<{ message: string; empruntId: number }>(`${this.apiUrl}/retourner-livre/${livreId}`, {});
  }

  // Emprunter un livre
  emprunterLivre(livreId: number): Observable<Emprunt> {
    return this.http.post<Emprunt>(this.apiUrl, { livreId });
  }
}
