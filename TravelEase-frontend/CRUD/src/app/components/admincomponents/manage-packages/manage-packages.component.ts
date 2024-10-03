import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { CategoryService } from '../../../services/category.service';
import { Package } from '../../../common/package.model';
import { Category } from '../../../common/category.model';
import { ActivatedRoute,Router } from '@angular/router';

declare var bootstrap: any;  

@Component({
  selector: 'app-manage-packages',
  templateUrl: './manage-packages.component.html',
  styleUrl: './manage-packages.component.css'
})
export class ManagePackagesComponent implements OnInit{
  packages: Package[] = [];
categories:Category[] = [];
categoryName: string | undefined;

selectedPackage: Package = {} as Package;
  isUpdating: boolean = false;


constructor(private dataService: DataService, private categoryService:CategoryService, private route: ActivatedRoute,private router: Router) {}



ngOnInit() {
  this.listpackage();
  this.listcategory();
  //this.info();
}


listpackage(){
  this.dataService.getPackageList().subscribe(
    data => {
      this.packages = data;
    }
  )
}

listcategory(){
  this.categoryService.getCategoryList().subscribe(
    categorydata => {
      this.categories = categorydata;
    }
  )
}




deletePackage(id: any) {
  if (confirm('Are you sure you want to delete this package?')) {
    if (!id) {
      console.error('Package ID is undefined');
      return;
    }
    this.dataService.delete(id).subscribe({
      next: () => {
        this.listpackage(); // Refresh the list after deletion
      },
      error: (err) => console.error('Error deleting package:', err)
    });
  }
}


updatePackage(id: any) {
  this.isUpdating = true;
  this.dataService.get(id).subscribe(data => {
    this.selectedPackage = {
      ...data,
      from_date: this.formatDate(data.from_date),
      to_date: this.formatDate(data.to_date)
    };
  });
}


formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toISOString().split('T')[0];
}

saveUpdatedPackage() {
  this.dataService.update(this.selectedPackage._id, this.selectedPackage).subscribe({
    next: () => {
      this.isUpdating = false;
      this.listpackage(); // Refresh the list after update
    },
    error: err => console.error('Error updating package:', err)
  });
}

cancelUpdate() {
  this.isUpdating = false;
  this.selectedPackage = {} as Package;
}

}



