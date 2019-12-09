import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {path:'home',loadChildren:'./home/home.module#HomePageModule'},
  { path: 'reeportes/:nip', loadChildren: './reeportes/reeportes.module#ReeportesPageModule' },
  { path: 'general', loadChildren: './general/general.module#GeneralPageModule' },
  {path:'socioeconomico/:nip',loadChildren:'./socieconomico/socieconomico.module#SocieconomicoPageModule'},
  { path: 'bienvenida', loadChildren: './bienvenida/bienvenida.module#BienvenidaPageModule' },
  { path: 'preguntas', loadChildren: './preguntas/preguntas.module#PreguntasPageModule' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
