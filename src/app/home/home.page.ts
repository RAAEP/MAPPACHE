import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { NoticiasService } from '../services/noticias.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {


  constructor(public api:NoticiasService, public loadingController:LoadingController) {}

  data1:any;

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.api.getNoticias()
      .subscribe(res => {
        console.log(res);
        this.data1 = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  
   
  ngOnInit() {
    this.getData();
  }
}
