import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../interface/Livre';

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private apiUrl = 'https://localhost:5001/api/Livres';

  constructor(private http: HttpClient) { }

  getAll(categorieId?: number): Observable<Livre[]> {
    let url = this.apiUrl;
    if (categorieId) {
      url += `?categorieId=${categorieId}`;
    }
    return this.http.get<Livre[]>(url);
  }

  getById(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.apiUrl}/${id}`);
  }

  create(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.apiUrl, livre);
  }

  update(id: number, livre: Livre): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, livre);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
