import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { CategoryService } from '../../../services/category.service';
import { Package } from '../../../common/package.model';
import { Category } from '../../../common/category.model';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
packages: Package[] = [];
categories:Category[] = [];
categoryName: string | undefined;
selectedPackage: any | null = null;

constructor(private dataService: DataService, private categoryService:CategoryService, private route: ActivatedRoute, private router:Router) {}

bookNow(packageId: string | any): void {
  this.router.navigate(['/user/book-package'], { queryParams: { packageId } });
}

ngOnInit() {
  this.selectedPackage = null;
  this.listpackage();
  this.listcategory();
  this.loadPackages()
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

loadPackages(): void {
  this.dataService.getPackageList().subscribe(
    (data) => {
      this.packages = data;
    },
    (error) => {
      console.error('Error fetching packages', error);
    }
  );
}


showDetails(package1: any): void {
  this.selectedPackage = package1;
  const popup = document.getElementById('detailsPopup');
  if (popup) {
    popup.style.display = 'block';
  }
}

closeDetails(): void {
  const popup = document.getElementById('detailsPopup');
  if (popup) {
    popup.style.display = 'none';
  }
  this.selectedPackage = null;
}



}