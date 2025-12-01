import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../service/categorie-service';
import { Categorie } from '../interface/Categorie';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-categorie-form',
  imports: [FormsModule, CommonModule, HttpClientModule,],
  templateUrl: './categorie-form.component.html',
  styleUrl: './categorie-form.component.css'
})
export class CategorieFormComponent implements OnInit {

  categorie: Categorie = { id: 0, nom: '', description: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catService: CategorieService
  ) {}

  ngOnInit(): void {
  const id = Number(this.route.snapshot.params['id']);
  if (id) {
    this.isEdit = true;
    this.catService.getById(id).subscribe(res => this.categorie = res);
  }
}


  save() {
  if (this.isEdit) {
    this.catService.update(this.categorie.id, this.categorie).subscribe(() => {
      this.router.navigate(['/categories']);
    });
  } else {
    this.catService.create(this.categorie).subscribe(() => {
      this.router.navigate(['/categories']);
    });
  }
}

}
