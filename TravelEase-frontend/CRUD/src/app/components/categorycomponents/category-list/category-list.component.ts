import { Component, OnInit } from '@angular/core';
import { Category } from '../../../common/category.model';
import { CategoryService } from '../../../services/category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = []

  constructor(private categoryService: CategoryService) {};
  
  ngOnInit(){
    this.listcategory();
  }
  
  
  listcategory(){
    this.categoryService.getCategoryList().subscribe(
      data => {
        this.categories = data;
        //console.log("jjj"+this.categories[0]._id);
      }
    )
  }
  }