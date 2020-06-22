import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {



elementType = 'url';
value = 'https://wwww.facebook.com';
  constructor() { }

  ngOnInit(): void {
  }

}
