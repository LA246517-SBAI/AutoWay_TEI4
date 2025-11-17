import { Injectable } from '@angular/core';
import { Livre } from './livre';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  private apiUrl = 'https://localhost:7247/api/Livres'; //url vers l api 

  constructor(private http: HttpClient) {}

  //recuperer tous les livres 
  getLivres(titre?: string, auteur?: string, categorieId?: number): Observable<Livre[]> {
    let params = new HttpParams();
    if (titre) params = params.set('titre', titre);
    if (auteur) params = params.set('auteur', auteur);
    if (categorieId) params = params.set('categorieId', categorieId.toString());

    return this.http.get<Livre[]>(this.apiUrl, { params });
  }

  //recuperer un livre par id
  getLivre(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.apiUrl}/${id}`);
  }

  //recuperer les livres disponibles
  getLivresDisponibles(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.apiUrl}/disponibles`);
  }

  //recuperer les livres empruntes 
  getLivresEmpruntes(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.apiUrl}/empruntes`);
  }

  //creer un livre
  addLivre(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.apiUrl, livre);
  }

  //modifier un livre
  updateLivre(livre: Livre): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${livre.id}`, livre);
  }

  //supprimer un livre
  deleteLivre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //recuperer les livres en retard
  getLivresEnRetard(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retard`);
  }
}
