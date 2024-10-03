import { Category } from "./category.model";
export interface Package {
    _id: String;
    name:string;
    from_date:Date | string;
    to_date:Date | string;
    description:string;
    price:number;
    short_description:string;
    category:Category;
    image:String;
}