import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Categorie } from '../interface/Categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'https://localhost:5001/api/Categories';


  constructor(private http: HttpClient) { }

  // Simule un token Admin
  private getHeaders(): HttpHeaders {
    const fakeAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                           'eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiQWRtaW4iXX0.' +
                           'FAKE_SIGNATURE';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${fakeAdminToken}`
    });
  }

  getAll(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  getById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`);
  }

  create(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, categorie, { headers: this.getHeaders() });
  }

  update(id: number, categorie: Categorie): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, categorie, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
