import { Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { CategorieListComponent } from '../app/categorie-list/categorie-list.component';
import { CategorieFormComponent } from '../app/categorie-form/categorie-form.component';


export const routes: Routes = [

    {path: 'connexion', component: ConnexionComponent},
    { path: 'categories', component: CategorieListComponent },
    { path: 'categories/new', component: CategorieFormComponent },
    { path: 'categories/edit/:id', component: CategorieFormComponent },
    { path: '**', redirectTo: 'categories' }
];
