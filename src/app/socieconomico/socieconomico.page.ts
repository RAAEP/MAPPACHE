import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router}      from '@angular/router';
import {SocioeconomicoAlumnosService} from '../services/socioeconomico-alumnos.service'

@Component({
  selector: 'app-socieconomico',
  templateUrl: './socieconomico.page.html',
  styleUrls: ['./socieconomico.page.scss'],
})
export class SocieconomicoPage implements OnInit {

  formSocio: any;
  formtrabajo: any;
  valor1=0;
  valor2=0;
  
  nip = null
  constructor(private activateRoute:ActivatedRoute,private router:Router,public api:SocioeconomicoAlumnosService) 
  {

    this.nip=this.activateRoute.snapshot.paramMap.get('nip')

    this.formSocio  = {'nip':this.nip,'ingresos_padre':0,'ingresos_madre':0,'ingresos_hermanos':0,'ingresos_propios':0,'ingresos_otros':0,'municipio':'Othón P. Blanco'};
    this.formtrabajo  = {};


   }
   nivelEstudio=[{"id":"1","estudio":"No lo sé"},
   {"id":"2","estudio":"No sabe leer ni escribir"},
   {"id":"3","estudio":"No fue a la escuela"},
   {"id":"4","estudio":"No terminó la Primaria"},
   {"id":"5","estudio":"Terminó la Primaria"},
   {"id":"6","estudio":"Tiene alguna capacitación técnica después de la Primaria"},
   {"id":"7","estudio":"No terminó la Secundaria"},
   {"id":"8","estudio":"Terminó la Secundaria"},
   {"id":"9","estudio":"Tiene alguna capacitación técnica después de la Secundaria"},
   {"id":"10","estudio":"Tiene estudios de técnico profesional incompletos"},
   {"id":"11","estudio":"Tiene estudios de técnico profesional completos"},
   {"id":"12","estudio":"No terminó la Preparatoria o Bachillerato"},
   {"id":"13","estudio":"Terminó la Preparatoria o Bachillerato"},
   {"id":"14","estudio":"No terminó la Licenciatura, Ingeniería ó Normal"},
   {"id":"15","estudio":"Terminó la Licenciatura, Ingeniería ó Normal"},
   {"id":"16","estudio":"No terminó la Maestría o Doctorado"},
   {"id":"17","estudio":"Terminó la Maestría o Doctorado"},
   {"id":"18","estudio":"Otro"}];

   nivelTrabajo=[
    {"id":"1" ,"trabajo":"No lo sé"},
    {"id":"2" ,"trabajo":"Labores del Hogar"},
    {"id":"3" ,"trabajo":"Dueño de negocio, empresa, despacho o comercio estable"},
    {"id":"4" ,"trabajo":"Profesor , investigador"},
    {"id":"5" ,"trabajo":"Profesionista que ejerce por su cuenta"},
    {"id":"6" ,"trabajo":"Obrero"},
    {"id":"7" ,"trabajo":"Ganadero, agricultor o similar"},
    {"id":"8" ,"trabajo":"Campesino, jornalero, pescador o similar"},
    {"id":"9" ,"trabajo":"Jubilado o pensionado"},
    {"id":"10" ,"trabajo":"Funcionario o gerente de empresa privada"},
    {"id":"11" ,"trabajo":"Funcionario de empresa pública"},
    {"id":"12" ,"trabajo":"Empleado, oficinista o secretaria de empresa privada"},
    {"id":"13" ,"trabajo":"Burócrata, oficinista o secretaria de empresa pública"},
    {"id":"14" ,"trabajo":"Trabajador de oficio con personal a su cargo"},
    {"id":"15" ,"trabajo":"Vendedor en comercio o empresa"},
    {"id":"16" ,"trabajo":"Vendedor por su cuenta o ambulante"},
    {"id":"17" ,"trabajo":"Peón, ayudante, mozo o empleada doméstica"},
    {"id":"18" ,"trabajo":"Miembro de las fuerzas armadas"},
    {"id":"19" ,"trabajo":"Otro"}]
    
  
    conVives=[
      {"id":"1" ,"vives":"Padre y madre"},
      {"id":"2" ,"vives":"Padre"},
      {"id":"3" ,"vives":"Madre"},
      {"id":"4" ,"vives":"Hermanos"},
      {"id":"5" ,"vives":"Cónyuge o pareja"},
      {"id":"6" ,"vives":"Otro familiar"},
      {"id":"7" ,"vives":"Amigo o amigos"},
      {"id":"8" ,"vives":"Sólo"},
      {"id":"9" ,"vives":"Hijos"},
      {"id":"10" ,"vives":"Otro"},]
  
    dependesDe=[
    {"id":"1" ,"dependes":"Padre y Madre"},
    {"id":"2" ,"dependes":"Padre, Madre y Yo mismo"},
    {"id":"3" ,"dependes":"Padre"},
    {"id":"4" ,"dependes":"Padre y Yo mismo"},
    {"id":"5" ,"dependes":"Madre"},
    {"id":"6" ,"dependes":"Madre y Yo mismo"},
    {"id":"7" ,"dependes":"Hermanos"},
    {"id":"8" ,"dependes":"Hermanos y Yo mismo"},
    {"id":"9" ,"dependes":"Cónyuge o pareja"},
    {"id":"10" ,"dependes":"Cónyuge, pareja y Yo mismo"},
    {"id":"11" ,"dependes":"Otro familiar o amigo"},
    {"id":"12" ,"dependes":"Yo mismo"},
    {"id":"13" ,"dependes":"Otro"}]

    numeroObjetos=[
      {"id":"1","valores":"1"},
      {"id":"2","valores":"2"},
      {"id":"3","valores":"3"},
      {"id":"4","valores":"4"},
      {"id":"5","valores":"5"},
      {"id":"6","valores":"6"},
      {"id":"7","valores":"7"},
      {"id":"8","valores":"8"},
      {"id":"9","valores":"9"},
      {"id":"10","valores":"Más de 9"}]
    
  
      enviar(){

        console.log(this.formSocio)
      
        this.api.envioDatos(this.formSocio)
        this.router.navigate(['/reeportes/'+this.formSocio.nip]);
      
      }
  
  ngOnInit() {
    console.log('este es el nip'+this.nip);
  }

}
