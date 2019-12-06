import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router}      from '@angular/router';

@Component({
  selector: 'app-reeportes',
  templateUrl: './reeportes.page.html',
  styleUrls: ['./reeportes.page.scss'],
})
export class ReeportesPage implements OnInit {

  nip = null

  constructor(private activateRoute:ActivatedRoute) 
  {
    this.nip=this.activateRoute.snapshot.paramMap.get('nip')

   }

  ngOnInit() {
  }

}
