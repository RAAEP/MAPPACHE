import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders, HttpErrorResponse  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeneralAlumnosService {
  header = new HttpHeaders();


  constructor(private http:HttpClient) { 
    this.header.append('Content-Type', 'aplicaction/json');
  this.header.append("Autorization","Raul"+localStorage.getItem("token"));
  }

  //Método para realizar el envio de datos al servidor
 envioDatos (data:any){

  let options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  
 var url = 'http://192.168.1.70/Proyecto_Nuevo_Ingreso/public/api/fichas_general';
 return new Promise(resolve => {
  this.http.post(url,JSON.stringify(data),options)
     .subscribe(data => {
       resolve(data);
      });
 });

 }
}
