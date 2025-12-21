// guard/admin.guard.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private userService: UserService,
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
    
    if (!token) {
      this.router.navigate(['/connexion']);
      return false;
    }

    // Vérifier le rôle actif
    const activeRole = localStorage.getItem('activeRole');
    if (activeRole && activeRole.toLowerCase() === 'admin') {
      return true;
    }

    // Sinon vérifier via le service
    if (this.userService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/livres']);
    return false;
  }
}