// components/navbar/navbar.component.ts
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userRoles: string[] = [];
  currentRole: string = '';
  username: string = '';
  menuOpen: boolean = false;
  private isBrowser: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadUserInfo();
    }
    
    this.userService.getUserRoles$().subscribe(roles => {
      this.userRoles = roles;
      this.isAdmin = this.userService.isAdmin();
      this.isLoggedIn = roles.length > 0;
      
      if (roles.length > 0 && !this.currentRole) {
        this.currentRole = roles.includes('Admin') ? 'Admin' : roles[0];
      }
    });
  }

  loadUserInfo(): void {
    if (!this.isBrowser) return;
    
    const token = localStorage.getItem('token');
    if (token) {
      const payload = this.userService.decodeToken(token);
      
      this.username = payload?.['sub'] || 
                      payload?.['username'] || 
                      payload?.['name'] || 
                      payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
                      'Utilisateur';
      
      this.userRoles = this.userService.getUserRoles();
      this.isAdmin = this.userService.isAdmin();
      this.isLoggedIn = true;
      
      const savedRole = localStorage.getItem('activeRole');
      if (savedRole && this.userRoles.includes(savedRole)) {
        this.currentRole = savedRole;
      } else if (this.userRoles.length > 0) {
        this.currentRole = this.userRoles.includes('Admin') ? 'Admin' : this.userRoles[0];
      }
    } else {
      this.isLoggedIn = false;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  onRoleChange(newRole: string): void {
  this.currentRole = newRole;
  if (this.isBrowser) {
    localStorage.setItem('activeRole', newRole);
    window.location.reload();
  }
  this.closeMenu();
}

  isCurrentRoleAdmin(): boolean {
    return this.currentRole.toLowerCase() === 'admin';
  }

  logout(): void {
    this.userService.logout();
    if (this.isBrowser) {
      localStorage.removeItem('activeRole');
    }
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.userRoles = [];
    this.currentRole = '';
    this.menuOpen = false;
    this.router.navigate(['/connexion']);
  }
}