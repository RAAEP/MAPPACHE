import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders, HttpErrorResponse  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeneralAlumnosService {


  constructor(private http:HttpClient) { }

  //Método para realizar el envio de datos al servidor
 envioDatos (data:any){

  let options = {
   
  };
  
 var url = 'http://192.168.1.93/Proyecto_Nuevo_Ingreso/public/api/fichas_general';
 return new Promise(resolve => {
  this.http.post(url,JSON.stringify(data),options)
     .subscribe(data => {
       resolve(data);
      });
 });

 }
}
