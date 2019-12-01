import { Component, OnInit } from '@angular/core';
import {ActivatedRoute}      from '@angular/router'

@Component({
  selector: 'app-socieconomico',
  templateUrl: './socieconomico.page.html',
  styleUrls: ['./socieconomico.page.scss'],
})
export class SocieconomicoPage implements OnInit {

  formSocio: any;

  nip = null
  constructor(private activateRoute:ActivatedRoute) 
  {
    this.nip=this.activateRoute.snapshot.paramMap.get('nip')

    this.formSocio  = {'nip':this.nip};

   }

  ngOnInit() {
    console.log('este es el nip'+this.nip);
  }

}
