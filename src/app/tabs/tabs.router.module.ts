import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
     
      {
        path: 'generals',
        children: [
          {
            path: '',
            loadChildren: '../general/general.module#GeneralPageModule'
          }
        ]
      },
      {
        path: 'reeportess',
        children: [
          {
            path: '',
            loadChildren: '../reeportes/reeportes.module#ReeportesPageModule'
          }
        ]
      },
      {
        path: 'socioeconomicos',
        children: [
          {
            path: '',
            loadChildren: '../socieconomico/socieconomico.module#SocieconomicoPageModule'
          }
        ]
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
