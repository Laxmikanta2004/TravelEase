import { Component } from '@angular/core';
import { Category } from '../../../common/category.model';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  categoryitem: Category = {
    name: ''
  };
  submitted = false;

  constructor(private CategoryService: CategoryService , private router:Router){}

  createCategory():void {
    const data = {
      name: this.categoryitem.name
    };

    this.CategoryService.create(data)
    .subscribe({
      next:(res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
    this.router.navigate(['/admin/manage-categories']);
  }

  newCategory(): void {
    this.submitted = false;
    this.categoryitem = {
      _id:'',
      name:''
    }
  }

}
