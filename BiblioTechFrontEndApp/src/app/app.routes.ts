import { Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { CategorieListComponent } from '../app/categorie-list/categorie-list.component';
import { CategorieFormComponent } from '../app/categorie-form/categorie-form.component';
import { LivresListComponent } from './livres-list/livres-list.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './guard/admin.guard';


export const routes: Routes = [

    {path: 'connexion', component: ConnexionComponent},
    { path: 'categories', component: CategorieListComponent },
    { path: 'categories/new', component: CategorieFormComponent },
    { path: 'categories/edit/:id', component: CategorieFormComponent },
    { path: 'livres', component: LivresListComponent },
    { path: 'inscription', component: InscriptionComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },

    { path: '**', redirectTo: 'connexion' }
];

