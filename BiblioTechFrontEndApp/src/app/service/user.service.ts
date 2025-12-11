import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  name: string;
  email: string;
  password: string;
  roles?: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  token: string;
}

export interface JwtPayload {
  sub?: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://localhost:5001/api/Users";
  private userRole$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = this.decodeToken(token);
      this.userRole$.next(payload?.role || null);
    }
  }

  // Décoder le JWT pour extraire les informations (rôle, etc)
  decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const decoded = JSON.parse(atob(parts[1]));
      return decoded;
    } catch (e) {
      console.error('Erreur de décodage du token:', e);
      return null;
    }
  }

  // Récupérer le rôle de l'utilisateur courant
  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = this.decodeToken(token);
      return payload?.role || null;
    }
    return null;
  }

  // Observable du rôle utilisateur
  getUserRole$() {
    return this.userRole$.asObservable();
  }

  // Vérifier si l'utilisateur est admin
  isAdmin(): boolean {
    return this.getUserRole() === 'admin' || this.getUserRole() === 'Admin';
  }

  // Définir le rôle après connexion
  setUserRole(role: string): void {
    this.userRole$.next(role);
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('token');
    this.userRole$.next(null);
  }

  // Inscription
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // Connexion
  login(credentials: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, credentials);
  }

  // Récupérer tous les utilisateurs 
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Récupérer un utilisateur par id 
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un utilisateur
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
}
