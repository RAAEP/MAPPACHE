import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { HttpClientModule } from '@angular/common/http';  //Modulo de angular para los servicios REST
import { FormsModule } from '@angular/forms';      // Modulo de angular para los formularios.


@NgModule({
  declarations: [AppComponent, MenuItemComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FormsModule,     // Esto le da acceso a la aplicación a todas las características de formularios de plantilla, incluyendo ngModel.
    HttpClientModule       //Esto le da acceso a la aplicación a todas las caracteristicas del HttpClient com metod get y post
   ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
