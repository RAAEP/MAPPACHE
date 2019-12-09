import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders, HttpErrorResponse  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getNoticias(){
    return this.http.get('http://192.168.1.93/Proyecto_Nuevo_Ingreso/public/api/noticias');
  }
}
