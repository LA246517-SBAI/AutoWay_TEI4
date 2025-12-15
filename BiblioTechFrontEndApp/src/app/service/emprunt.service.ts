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

  getMesEmprunts(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${this.apiUrl}/mes-emprunts`);
  }

  getMonHistorique(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${this.apiUrl}/mon-historique`);
  }

  emprunterLivre(livreId: number): Observable<Emprunt> {
    return this.http.post<Emprunt>(this.apiUrl, { livreId });
  }

  retournerLivre(livreId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/retourner-livre/${livreId}`, {});
  }
}
