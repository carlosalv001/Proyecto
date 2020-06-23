import { Component} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {ProductService } from '../../services/product.service';
import {Product} from  '../../models/product';
import {ProductListComponent} from '../products/product-list/product-list.component';
import { element } from 'protractor';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent  {
  productList:Product[]
   producto:any=[]; //aqui esta la informacion de los productos
   bandera:boolean =false;
   public barChartData: ChartDataSets[];
   ele:ChartDataSets[];

  constructor(public productService:ProductService) {
    console.log("hola");
    console.log(this.productService.getProducts);
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
    //console.log(this.productList[1].name);
    //  this.nombre=this.productList[0].name;
   // this.productList.forEach(element => this.producto.push(element));
   }

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
    

     this.barChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Verano'/*`${this.productList[0].category}`*/  },
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Otoño' },
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Invierno' },
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Primavera' }
    ];
  }

  onEdit(product:Product){
    this.productService.selectedProduct=Object.assign({},product);
    
    
  }

  onDelete ($key:string){
    this.productService.deleteProduct($key);
  }

  precios(){
    let precio:number[];
    for(var i=0; i<this.productList.length; i++){
      precio.push(this.productList[i].price);
    }
    console.log(precio.toString);
    return precio;

  }


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Verano', 'Otoño', 'Invierno', 'Primavera'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  public randomize(): void {
    // Only Change 3 values
    const data = [];
    const data_oto=[];
    const data_inv=[];
    const data_prim=[];
    var totver=0;
    var tototo=0;
    var totinv=0;
    var totprim=0
    this.bandera=true;

    this.barChartData=[];

    for (var i=0; i<this.productList.length; i++){
      if(this.productList[i].category=='Verano'){
        
        //this.barChartLabels.push(this.productList[i].location);
        //data.push(this.productList[i].price);
        totver+= Number(this.productList[i].price);
      /*  data_oto.push(0);
        data_inv.push(0);
        data_prim.push(0);*/
      }
      
      if(this.productList[i].category=='Otoño'){
       // if(!this.barChartLabels.indexOf(this.productList[i].location)) 
        //this.barChartLabels.push(this.productList[i].location);
      //  data_oto.push(this.productList[i].price);
        tototo+=Number(this.productList[i].price);
       // data.push(0);
       // data_inv.push(0);
        //data_prim.push(0);
      }
      
      if(this.productList[i].category=='Invierno'){
        //this.barChartLabels.push(this.productList[i].location);
    //    data_inv.push(this.productList[i].price);
        totinv+=Number(this.productList[i].price);
      /*  data.push(0);
        data_inv.push(0);
        data_prim.push(0); */
      }
      if(this.productList[i].category=='Primavera'){
        //this.barChartLabels.push(this.productList[i].location);
      //  data_prim.push(this.productList[i].price);
        totprim+=Number(this.productList[i].price);
      /*  data.push(0);
        data_inv.push(0);
        data_oto.push(0); */
      }
      
    }
    data.push(totver);
    data_oto.push(0)
    data_oto.push(tototo);
    
    data_inv.push(0);
    data_inv.push(0);
    data_inv.push(totinv);
    data_prim.push(0);
    data_prim.push(0);
    data_prim.push(0);
    data_prim.push(totprim);
    

    this.ngOnInit();
    this.barChartData = [
      { data: data, label: 'Verano'  },
      { data: data_oto, label: 'Otoño' },
      { data: data_inv, label: 'Invierno' },
      { data: data_prim, label: 'Primavera' }
    ];
    
  }

}
