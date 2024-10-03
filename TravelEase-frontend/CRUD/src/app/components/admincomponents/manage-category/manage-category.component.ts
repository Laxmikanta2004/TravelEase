import { Component, OnInit } from '@angular/core';
import { Category } from '../../../common/category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent implements OnInit{
  categories: Category[] = []
  selectedCategory: Category = new Category(); // To hold the selected category for update
  isUpdating: boolean = false;

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



  // Update category

  updateCategory(category: Category) {
    this.selectedCategory = { ...category };
    this.isUpdating = true;
  }

  saveUpdatedCategory() {
    this.categoryService.update(this.selectedCategory._id, this.selectedCategory).subscribe({
      next: () => {
        this.isUpdating = false;
        this.listcategory(); // Refresh the list
      },
      error: err => {
        console.error('Error updating category', err);
      }
    });
  }


  // Delete category

  deleteCategory(id: string | undefined) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.delete(id).subscribe({
        next: () => {
          this.listcategory(); // Refresh the list
        },
        error: err => {
          console.error('Error deleting category', err);
        }
      });
    }
  }

  cancelUpdate() {
    this.isUpdating = false;
    this.selectedCategory = new Category();
  }
}
