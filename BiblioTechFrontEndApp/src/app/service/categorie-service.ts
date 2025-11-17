import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../interface/Categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = "https://localhost:5001/api/Categories";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  getById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`);
  }

  create(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, cat);
  }

  update(id: number, cat: Categorie): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, cat);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
