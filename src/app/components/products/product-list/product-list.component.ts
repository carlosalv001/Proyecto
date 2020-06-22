import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


//service
import {ProductService} from '../../../services/product.service';


//classProduct

import {Product} from '../../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList:Product[]

  constructor(
    private productService:ProductService, router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getProducts()
    .snapshotChanges()
    .subscribe(item=>{
      this.productList=[];
      item.forEach(element =>{
        let x = element.payload.toJSON();
        x["$key"]=element.key;
        this.productList.push(x as Product);
      });
    });
    console.log(this.productList);
  }

  onEdit(product:Product){
    this.productService.selectedProduct=Object.assign({},product);
    
    
  }

  onDelete ($key:string){
    this.productService.deleteProduct($key);
  }

}
