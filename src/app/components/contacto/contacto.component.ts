import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
   nodemailer:any;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
  }

  enviar(nom:string,mail:string,apellido:string,comentario:string){
    
    let user ={
       name: nom,
     mai: mail,
     apellid : apellido,
     comentari : comentario,
    }
   

    console.log(user.name);
    console.log(user.mai);
    console.log(user.apellid);
    console.log(user.comentari);

    this._http.post('http://localhosts:3000/sendmail',user);

  }
  

}
