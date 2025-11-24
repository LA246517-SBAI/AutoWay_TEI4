import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../interface/Livre';

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private apiUrl = 'https://localhost:5001/api/Livres'; // à adapter

  constructor(private http: HttpClient) { }

  getAll(categorieId?: number): Observable<Livre[]> {
    let url = this.apiUrl;
    if (categorieId) {
      url += `?categorieId=${categorieId}`;
    }
    return this.http.get<Livre[]>(url);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
