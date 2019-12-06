import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SocieconomicoPage } from './socieconomico.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{path: '',component: SocieconomicoPage}])
  ],
  declarations: [SocieconomicoPage]
})
export class SocieconomicoPageModule {}
