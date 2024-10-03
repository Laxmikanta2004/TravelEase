import { Component } from '@angular/core';
import { Package } from '../../../common/package.model';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../common/category.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})



export class CreateComponent {
  packageitem: Package = {
    _id: '',
    name: '',
    from_date: new Date(),
    to_date: new Date(),
    description: '',
    price: 0,
    short_description: '',
    image:'',
    category:{} as Category
  };
  categories:Category[] = [];
  submitted = false;


  constructor(private dataService: DataService,private router:Router, private categoryService:CategoryService){}

  ngOnInit(): void{
    this.getCategories();
  }

  getCategories():void{
    this.categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error:(e) => console.error(e)
  });
  }


  createPackage(): void {

    const fromDate = this.packageitem.from_date instanceof Date ? this.packageitem.from_date.toISOString() : new Date(this.packageitem.from_date).toISOString();
    const toDate = this.packageitem.to_date instanceof Date ? this.packageitem.to_date.toISOString() : new Date(this.packageitem.to_date).toISOString();


    const data = {
      name: this.packageitem.name,
      from_date: fromDate,
      to_date: toDate,
      description: this.packageitem.description,
      price: this.packageitem.price,
      //no_of_adult: this.packageitem.no_of_adult,
      //no_of_child: this.packageitem.no_of_child,
      short_description: this.packageitem.short_description,
      //no_of_people: this.packageitem.no_of_people,
      image:this.packageitem.image,
      category:this.packageitem.category
    };

    this.dataService.create(data)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
      
    });
    this.router.navigate(['/']);
  }

  newPackage(): void {
    this.submitted = false;
    this.packageitem = {
      _id:'',
      name:'',
      from_date:new Date(),
      to_date:new Date(),
      description: '',
      price: 0,
      //no_of_adult: 0,
      //no_of_child: 0,
      short_description: '',
      //no_of_people: 0,
      image:'',
      category:{} as Category
    }
  }
}
