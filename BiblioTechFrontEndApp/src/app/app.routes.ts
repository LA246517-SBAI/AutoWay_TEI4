// app.routes.ts
import { Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { CategorieListComponent } from '../app/categorie-list/categorie-list.component';
import { CategorieFormComponent } from '../app/categorie-form/categorie-form.component';
import { LivresListComponent } from './livres-list/livres-list.component';
import { LivreFormComponent } from './livre-form/livre-form.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MesEmpruntsComponent } from './mes-emprunts/mes-emprunts.component';
import { MonHistoriqueComponent } from './mon-historique/mon-historique.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';

export const routes: Routes = [
  // Routes publiques (pas besoin d'être connecté)
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },

  // Routes protégées (besoin d'être connecté)
  { path: 'categories', component: CategorieListComponent, canActivate: [AuthGuard] },
  { path: 'categories/new', component: CategorieFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'categories/edit/:id', component: CategorieFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'livres', component: LivresListComponent, canActivate: [AuthGuard] },
  { path: 'livres/new', component: LivreFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'livres/edit/:id', component: LivreFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'mes-emprunts', component: MesEmpruntsComponent, canActivate: [AuthGuard] },
  { path: 'mon-historique', component: MonHistoriqueComponent, canActivate: [AuthGuard] },

  // Routes admin uniquement
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] },

  // Redirection par défaut
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: '**', redirectTo: 'connexion' }
];