// guard/auth.guard.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  canActivate(): boolean {
    if (!this.isBrowser) {
      return true; // Autoriser côté serveur (SSR)
    }

    const token = localStorage.getItem('token');
    
    if (token) {
      return true;
    }

    this.router.navigate(['/connexion']);
    return false;
  }
}