import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
   nodemailer:any;

  constructor(public _MessageService: MessageService) { }

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

    //return this._http.post('http://localhost:3000/formulario', user);

  }
  
  contactForm(form) {
    this._MessageService.sendMessage(form).subscribe(() => {
     /* Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })*/
      alert("todo bien");
    });
    }

}
