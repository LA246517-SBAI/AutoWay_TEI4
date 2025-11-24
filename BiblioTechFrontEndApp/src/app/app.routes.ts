import { Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { CategorieListComponent } from '../app/categorie-list/categorie-list.component';
import { CategorieFormComponent } from '../app/categorie-form/categorie-form.component';
import { InscriptionComponent } from './components/inscription/inscription.component';


export const routes: Routes = [

    {path: 'connexion', component: ConnexionComponent},
    { path: 'categories', component: CategorieListComponent },
    { path: 'categories/new', component: CategorieFormComponent },
    { path: 'categories/edit/:id', component: CategorieFormComponent },
    { path: 'inscription', component: InscriptionComponent},
    { path: '**', redirectTo: 'connexion' }
];
