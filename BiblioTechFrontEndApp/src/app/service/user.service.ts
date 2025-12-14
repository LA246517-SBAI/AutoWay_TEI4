import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

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
  role?: string | string[];
  username?: string;
  name?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://localhost:5001/api/Users";
  private userRoles$ = new BehaviorSubject<string[]>([]);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = this.decodeToken(token);
        const roles = this.extractRoles(payload);
        this.userRoles$.next(roles);
      }
    }
  }

  // Décoder le JWT
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

  // Extraire les rôles du payload
  private extractRoles(payload: JwtPayload | null): string[] {
    if (!payload) return [];
    
    const rolesClaim = payload.role || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
    if (!rolesClaim) return [];
    
    if (Array.isArray(rolesClaim)) {
      return rolesClaim;
    }
    
    return [rolesClaim];
  }

  // Récupérer les rôles
  getUserRoles(): string[] {
    if (!this.isBrowser) return [];
    
    const token = localStorage.getItem('token');
    if (token) {
      const payload = this.decodeToken(token);
      return this.extractRoles(payload);
    }
    return [];
  }

  getUserRoles$(): Observable<string[]> {
    return this.userRoles$.asObservable();
  }

  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.some(r => r.toLowerCase() === role.toLowerCase());
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('token');
  }

  setUserRoles(roles: string | string[]): void {
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    this.userRoles$.next(rolesArray);
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('activeRole');
    }
    this.userRoles$.next([]);
  }

  // API calls
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  login(credentials: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, credentials);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}