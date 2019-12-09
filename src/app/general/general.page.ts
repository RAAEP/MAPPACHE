import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import {GeneralAlumnosService}from '../services/general-alumnos.service';
import{Router}from'@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {

  formGeneral: any;
  // Variable que permite lanzar una vez la alerta del la curp
  bandera1 = true;
   // Variable que permite lanzar una vez la alerta del la promedio
   bandera2 = true;
  prepas = [];
  munici = [];
  colonias = [];
  num = 1;
  
  nu = Math.floor(1e3 + (Math.random() * 9e3));
  constructor(public alertController: AlertController,public navCtrl: NavController,private router:Router,public api:GeneralAlumnosService, public loadingController:LoadingController) {  
    
    this.formGeneral = {'nip':this.nu};

  }

  municp(){
    let munici = [];

    for (const iterator of this.municipio[this.formGeneral.entidad_federativa_prepa]) {
      console.log(iterator);
      munici.push(iterator);
    }

    this.munici = munici;

  }
  
  prepar(){
    let prepas = [];
    this.Preparatorias.forEach(element => {
      if (this.formGeneral.municipalitySchool === element.Municipio) {

        prepas.push(element)
      }
      
    });
    this.prepas = prepas;

  }

  codigoPOS(){
    let colonias = [];

    this.codigosOtho.forEach(element => {
      if (this.formGeneral.codigo_postal === element.cp) {

        colonias.push(element)
      }
      
    });

    this.colonias = colonias

  }

  

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: this.formGeneral.nombre_aspirante +" "+ this.formGeneral.apellido_paterno + " "+this.formGeneral.apellido_materno,
      subHeader: 'Estas seguro de continuar',
      message: 'Recuerda que todo los datos recabados por esta apliación, son para cuestiones acádemicas y aceptas no estar ingresado información que no te pertenezca.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Estoy deacuerdo',
          handler: () => {
            console.log('Confirm Okay');
            this.enviar();
            
          }
        }
      ]
    });

    await alert.present();
  }
  async promedioAlert() {
    if (this.bandera2) {
      this.bandera2 = false;
      const alert = await this.alertController.create({
        header: 'Promedio',
        subHeader: '',
        message: 'Por favor ingreso tu promedio en equivalencia escala 0-100 donde 70 es aprobatorio.',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }
  // Alerta para saber que hacer con la curp
  async curpAlert() {
    if (this.bandera1) {
      this.bandera1 = false;
      const alert = await this.alertController.create({
        header: "CURP",
        subHeader: '!Cargar datos¡',
        message: 'Una vez ingresada tu CURP por favor selecciona el botón verde, para poder extraer algunos datos de ella.',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }

  curpFecha(){
    let cadena = this.formGeneral.curp,
  inicio = 4,
  fin    = 11,
  subCadena = cadena.substring(inicio, fin);
  var meses=new Array("01","02","03","04","05","06","07","08","09","10","11","12");

  var year = subCadena.substring(0,2);
  var mes = subCadena.substring(2,4); 
  var dia = subCadena.substring(4,6);  
  var sexo = subCadena.substring(6,7); 
  var serverdate = new Date(year,(mes-1),dia);
  var datestring= serverdate.getFullYear()+ "-" + meses[serverdate.getMonth()] + "-"+serverdate.getDate();
                      
console.log(subCadena);
console.log(datestring);
   this.formGeneral.fecha_nacimiento = datestring;
   this.formGeneral.sexo = sexo;
    }

  carreras = [{"id":"1","carrera":"ARQUITECTURA"}
    ,{"id":"16","carrera":"CONTADOR PÚBLICO"}
    ,{"id":"20","carrera":"CONTADOR PÚBLICO ABIERTO"}
    ,{"id":"2","carrera":"INGENIERÍA CIVIL"}
    ,{"id":"3","carrera":"INGENIERÍA ELÉCTRICA"}
    ,{"id":"15","carrera":"INGENIERÍA EN ADMINISTRACIÓN"}
    ,{"id":"19","carrera":"INGENIERÍA EN ADMINISTRACIÓN ABIERTO"}
    ,{"id":"10","carrera":"INGENIERÍA EN GESTIÓN EMPRESARIAL"}
    ,{"id":"24","carrera":"INGENIERÍA EN GESTIÓN EMPRESARIAL ABIERTO"}
    ,{"id":"18","carrera":"INGENIERÍA EN SISTEMAS COMPUTACIONALES"}
    ,{"id":"17","carrera":"INGENIERÍA EN TECNOLOGÍAS DE LA INFORMACIÓN Y COMUNICACIONES"}
    ,{"id":"4","carrera":"LICENCIATURA EN ADMINISTRACIÓN"}
    ,{"id":"5","carrera":"LICENCIATURA EN BIOLOGÍA"}
    ,{"id":"23","carrera":"MAESTRIA EN CONSTRUCCIÓN"}
    ,{"id":"25","carrera":"MAESTRÍA EN MANEJO DE ZONA COSTERA"}
    ,{"id":"40","carrera":"MAESTRÍA EN URBANISMO"}];

    estados=[
      { "id":"1","clave": "Aguascalientes", "nombre": "AGUASCALIENTES" },
      { "id":"2","clave": "BajaCalifornia", "nombre": "BAJA CALIFORNIA" },
      { "id":"3","clave": "BajaCaliforniaSur", "nombre": "BAJA CALIFORNIA SUR" },
      { "id":"4","clave": "Campeche", "nombre": "CAMPECHE" },
      { "id":"5","clave": "Coahuila", "nombre": "COAHUILA" },
      { "id":"6","clave": "Colima", "nombre": "COLIMA" },
      { "id":"7","clave": "Chihuahua", "nombre": "CHIHUAHUA" },
      { "id":"8","clave": "Chiapas", "nombre": "CHIAPAS" },
      { "id":"9","clave": "CiudaddeMéxico", "nombre": "CIUDAD DE MEXICO" },
      { "id":"10","clave": "Durango", "nombre": "DURANGO" },
      { "id":"11","clave": "Guerrero", "nombre": "GUERRERO" },
      { "id":"12","clave": "Guanajuato", "nombre": "GUANAJUATO" },
      { "id":"13","clave": "Hidalgo", "nombre": "HIDALGO" },
      { "id":"14","clave": "Jalisco", "nombre": "JALISCO" },
      { "id":"15","clave": "Michoacán", "nombre": "MICHOACAN" },
      { "id":"16","clave": "MEX", "nombre": "ESTADO DE MEXICO" },
      { "id":"17","clave": "Morelos", "nombre": "MORELOS" },
      { "id":"18","clave": "Nayarit", "nombre": "NAYARIT" },
      { "id":"19","clave": "NuevoLeón", "nombre": "NUEVO LEÓN" },
      { "id":"20","clave": "Oaxaca", "nombre": "OAXACA" },
      { "id":"21","clave": "Puebla", "nombre": "PUEBLA" },
      { "id":"22","clave": "QuintanaRoo", "nombre": "QUINTANA ROO" },
      { "id":"23","clave": "Querétaro", "nombre": "QUERÉTARO" },
      { "id":"24","clave": "Sinaloa", "nombre": "SINALOA" },
      { "id":"25","clave": "SanLuisPotosí", "nombre": "SAN LUIS POTOSÍ" },
      { "id":"26","clave": "Sonora", "nombre": "SONORA" },
      { "id":"27","clave": "Tabasco", "nombre": "TABASCO" },
      { "id":"28","clave": "Tlaxcala", "nombre": "TLAXCALA" },
      { "id":"29","clave": "Tamaulipas", "nombre": "TAMAULIPAS" },
      { "id":"30","clave": "Veracruz", "nombre": "VERACRUZ" },
      { "id":"31","clave": "Yucatán", "nombre": "YUCATÁN" },
      { "id":"32","clave": "Zacatecas", "nombre": "ZACATECAS" },
      { "id":"34","clave": "Extranjero", "nombre": "EXTRANJERO" } ];

      municipio=
      {"1":["Aguascalientes","Asientos","Calvillo","Cosío","Jesús María","Pabellón de Arteaga","Rincón de Romos","San José de Gracia","Tepezalá","El Llano","Palo Alto","San Francisco de los Romo"],
        "2":["Ensenada","Mexicali","Tecate","Tijuana","Playas de Rosarito"],
        "3":["Comondú","Ciudad Constitución","Mulegé","Santa Rosalía","La Paz","Los Cabos","San José del Cabo","Loreto"],
        "4":["Calkiní","Campeche","San Francisco de Campeche","Carmen","Ciudad del Carmen","Champotón","Hecelchakán","Hopelchén","Palizada","Tenabo","Escárcega","Calakmul","Xpujil","Candelaria"],
        "5":["Abasolo","Acuña","Ciudad Acuña","Allende","Arteaga","Candela","Castaños","Cuatro Ciénegas","Cuatro Ciénegas de Carranza","Escobedo","Francisco I. Madero","Francisco I. Madero (Chávez)","Frontera","General Cepeda","Guerrero","Hidalgo","Jiménez","Juárez","Lamadrid","Matamoros","Monclova","Morelos","Múzquiz","Ciudad Melchor Múzquiz","Nadadores","Nava","Ocampo","Parras","Parras de la Fuente","Piedras Negras","Progreso","Ramos Arizpe","Sabinas","Sacramento",
         "Saltillo","San Buenaventura","San Juan de Sabinas","Nueva Rosita","San Pedro","Sierra Mojada","Torreón","Viesca","Villa Unión",
         "Zaragoza"],
        "6":["Armería","Ciudad de Armería","Colima","Comala","Coquimatlán","Cuauhtémoc","Ixtlahuacán","Manzanillo","Minatitlán","Tecomán","Villa de Álvarez","Ciudad de Villa de Álvarez"],
        "8":["Acacoyagua","Acala","Acapetahua","Altamirano","Amatán","Amatenango de la Frontera","Amatenango del Valle","Angel Albino Corzo","Jaltenango de la Paz (Angel Albino Corzo)",
         "Arriaga","Bejucal de Ocampo","Bella Vista","Berriozábal","Bochil","El Bosque","Cacahoatán","Catazajá","Cintalapa","Cintalapa de Figueroa",
         "Coapilla","Comitán de Domínguez","La Concordia","Copainalá","Chalchihuitán","Chamula","Chanal","Chapultenango","Chenalhó","Chiapa de Corzo",
         "Chiapilla","Chicoasén","Chicomuselo","Chilón","Escuintla","Francisco León","Rivera el Viejo Carmen","Frontera Comalapa","Frontera Hidalgo","La Grandeza",
         "Huehuetán","Huixtán","Huitiupán","Huixtla","La Independencia","Ixhuatán","Ixtacomitán","Ixtapa","Ixtapangajoya","Jiquipilas","Jitotol","Juárez","Larráinzar",
         "La Libertad","Mapastepec","Las Margaritas","Mazapa de Madero","Mazatán","Metapa","Metapa de Domínguez","Mitontic","Motozintla","Motozintla de Mendoza","Nicolás Ruíz",
         "Ocosingo","Ocotepec","Ocozocoautla de Espinosa","Ostuacán","Osumacinta","Oxchuc","Palenque","Pantelhó","Pantepec","Pichucalco","Pijijiapan","El Porvenir","El Porvenir de Velasco Suárez",
         "Villa Comaltitlán","Pueblo Nuevo Solistahuacán","Rayón","Reforma","Las Rosas","Sabanilla","Salto de Agua","San Cristóbal de las Casas","San Fernando","Siltepec","Simojovel","Simojovel de Allende","Sitalá","Socoltenango",
         "Solosuchiapa","Soyaló","Suchiapa","Suchiate","Ciudad Hidalgo","Sunuapa","Tapachula","Tapachula de Córdova y Ordóñez","Tapalapa","Tapilula","Tecpatán","Tenejapa","Teopisca","Tila","Tonalá","Totolapa","La Trinitaria","Tumbalá",
         "Tuxtla Gutiérrez","Tuxtla Chico","Tuzantán","Tzimol","Unión Juárez","Venustiano Carranza","Villa Corzo","Villaflores","Yajalón","San Lucas","Zinacantán","San Juan Cancuc","Aldama","Benemérito de las Américas","Maravilla Tenejapa","Marqués de Comillas","Zamora Pico de Oro","Montecristo de Guerrero","San Andrés Duraznal","Santiago el Pinar"],
         
    "7":["Ahumada","Miguel Ahumada","Aldama","Juan Aldama","Allende","Valle de Ignacio Allende","Aquiles Serdán","Santa Eulalia","Ascensión","Bachíniva","Balleza","Mariano Balleza","Batopilas","Bocoyna","Buenaventura",
         "San Buenaventura","Camargo","Santa Rosalía de Camargo","Carichí","Casas Grandes","Coronado","José Esteban Coronado","Coyame del Sotol","Santiago de Coyame","La Cruz","Cuauhtémoc","Cusihuiriachi","Chihuahua","Chínipas","Chínipas de Almada","Delicias","Dr. Belisario Domínguez","San Lorenzo","Galeana","Hermenegildo Galeana","Santa Isabel","Gómez Farías","Valentín Gómez Farías","Gran Morelos","San Nicolás de Carretas","Guachochi","Guadalupe","Guadalupe y Calvo","Guazapares","Témoris","Guerrero","Vicente Guerrero","Hidalgo del Parral","Huejotitán","Ignacio Zaragoza","Janos","Jiménez","José Mariano Jiménez","Juárez","Julimes","López","Octaviano López","Madera","Maguarichi","Manuel Benavides","Matachí","Matamoros","Mariano Matamoros","Meoqui","Pedro Meoqui","Morelos","Moris","Namiquipa","Nonoava","Nuevo Casas Grandes","Ocampo","Melchor Ocampo","Ojinaga","Manuel Ojinaga","Praxedis G. Guerrero","Riva Palacio","San Andrés","Rosales","Santa Cruz de Rosales","Rosario","Valle del Rosario","San Francisco de Borja","San Francisco de Conchos","San Francisco del Oro","Santa Bárbara","Satevó","San Francisco Javier de Satevó","Saucillo","Temósachic","El Tule","Urique","Uruachi","Valle de Zaragoza"],
    "9":["Azcapotzalco","","Coyoacán","Cuajimalpa de Morelos","Gustavo A. Madero","Iztacalco","Iztapalapa","La Magdalena Contreras","Milpa Alta","Álvaro Obregón","Tláhuac","Tlalpan","Xochimilco","Benito Juárez","Cuauhtémoc","Miguel Hidalgo","Venustiano Carranza"],
    "10":["Canatlán","Canelas","Coneto de Comonfort","Cuencamé","Cuencamé de Ceniceros","Durango","Victoria de Durango","General Simón Bolívar","Gómez Palacio","Guadalupe Victoria","Guanaceví","Hidalgo","Villa Hidalgo","Indé","Lerdo","Mapimí","Mezquital","San Francisco del Mezquital","Nazas","Nombre de Dios","Ocampo","Villa Ocampo","El Oro","Santa María del Oro","Otáez","Pánuco de Coronado","Francisco I. Madero","Peñón Blanco","Poanas","Villa Unión","Pueblo Nuevo","El Salto","Rodeo","San Bernardo","San Dimas","Tayoltita","San Juan de Guadalupe","San Juan del Río","San Juan del Río del Centauro del Norte","San Luis del Cordero","San Pedro del Gallo","Santa Clara","Santiago Papasquiaro","Súchil","Tamazula","Tamazula de Victoria","Tepehuanes","Santa Catarina de Tepehuanes","Tlahualilo","Tlahualilo de Zaragoza","Topia","Vicente Guerrero","Nuevo Ideal"],
    "12":["Abasolo","Acámbaro","San Miguel de Allende","Apaseo el Alto","Apaseo el Grande","Atarjea","Celaya","Manuel Doblado","Ciudad Manuel Doblado","Comonfort",
         "Coroneo","Cortazar","Cuerámaro","Doctor Mora","Dolores Hidalgo Cuna de la Independencia Nacional","Guanajuato","Huanímaro","Irapuato","Jaral del Progreso","Jerécuaro","León","León de los Aldama","Moroleón","Ocampo","Pénjamo","Pueblo Nuevo","Purísima del Rincón","Purísima de Bustos","Romita","Salamanca","Salvatierra","San Diego de la Unión","San Felipe","San Francisco del Rincón","San José Iturbide","San Luis de la Paz","Santa Catarina","Santa Cruz de Juventino Rosas","Juventino Rosas","Santiago Maravatío","Silao de la Victoria","Tarandacuao","Tarimoro","Tierra Blanca","Uriangato","Valle de Santiago","Victoria","Villagrán","Xichú","Yuriria"],
    "11":["Acapulco de Juárez","Ahuacuotzingo","Ajuchitlán del Progreso","Alcozauca de Guerrero","Alpoyeca","Apaxtla","Ciudad Apaxtla de Castrejón","Arcelia","Atenango del Río","Atlamajalcingo del Monte","Atlixtac","Atoyac de Álvarez","Ayutla de los Libres","Azoyú","Benito Juárez","San Jerónimo de Juárez","Buenavista de Cuéllar","Coahuayutla de José María Izazaga","Coahuayutla de Guerrero","Cocula","Copala","Copalillo","Copanatoyac","Coyuca de Benítez","Coyuca de Catalán","Cuajinicuilapa","Cualác","Cuautepec","Cuetzala del Progreso","Cutzamala de Pinzón","Chilapa de Álvarez","Chilpancingo de los Bravo","Florencio Villarreal","Cruz Grande","General Canuto A. Neri","Acapetlahuaya","General Heliodoro Castillo","Tlacotepec","Huamuxtitlán","Huitzuco de los Figueroa","Ciudad de Huitzuco","Iguala de la Independencia","Igualapa","Ixcateopan de Cuauhtémoc","Zihuatanejo de Azueta","Zihuatanejo","Juan R. Escudero","Tierra Colorada","Leonardo Bravo","Chichihualco",
         "Malinaltepec","Mártir de Cuilapan","Apango","Metlatónoc","Mochitlán","Olinalá","Ometepec","Pedro Ascencio Alquisiras","Ixcapuzalco","Petatlán","Pilcaya","Pungarabato","Ciudad Altamirano","Quechultenango","San Luis Acatlán","San Marcos","San Miguel Totolapan","Taxco de Alarcón","Tecoanapa","Técpan de Galeana","Teloloapan","Tepecoacuilco de Trujano","Tetipac","Tixtla de Guerrero","Tlacoachistlahuaca","Tlacoapa","Tlalchapa","Tlalixtaquilla de Maldonado","Tlalixtaquilla","Tlapa de Comonfort","Tlapehuala","La Unión de Isidoro Montes de Oca","La Unión","Xalpatláhuac","Xochihuehuetlán","Xochistlahuaca","Zapotitlán Tablas","Zirándaro","Zirándaro de los Chávez","Zitlala","Eduardo Neri","Zumpango del Río","Acatepec","Marquelia","Cochoapa el Grande","José Joaquín de Herrera","Hueycantenango","Juchitán","Iliatenco"],
    "13":["Acatlán","Acaxochitlán","Actopan","Agua Blanca de Iturbide","Ajacuba","Alfajayucan","Almoloya","Apan","El Arenal","Atitalaquia","Atlapexco","Atotonilco el Grande","Atotonilco de Tula","Calnali","Cardonal","Cuautepec de Hinojosa","Cuautepec","Chapantongo","Chapulhuacán","Chilcuautla","Eloxochitlán","Emiliano Zapata","Epazoyucan","Francisco I. Madero","Tepatepec","Huasca de Ocampo","Huautla","Huazalingo","Huehuetla","Huejutla de Reyes","Huichapan","Ixmiquilpan","Jacala de Ledezma","Jacala","Jaltocán","Juárez Hidalgo","Lolotla","Metepec","San Agustín Metzquititlán","Mezquititlán","Metztitlán","Mineral del Chico","Mineral del Monte","La Misión","Mixquiahuala de Juárez","Molango de Escamilla","Nicolás Flores","Nopala de Villagrán","Omitlán de Juárez","San Felipe Orizatlán","Pacula","Pachuca de Soto",
         "Pisaflores","Progreso de Obregón","Mineral de la Reforma","Pachuquilla","San Agustín Tlaxiaca","San Bartolo Tutotepec","San Salvador","Santiago de Anaya","Santiago Tulantepec de Lugo Guerrero","Santiago Tulantepec","Singuilucan","Tasquillo","Tecozautla","Tenango de Doria","Tepeapulco","Tepehuacán de Guerrero","Tepeji del Río de Ocampo","Tepetitlán","Tetepango","Villa de Tezontepec","Tezontepec","Tezontepec de Aldama","Tianguistengo","Tizayuca","Tlahuelilpan","Tlahuiltepa","Tlanalapa","Tlanchinol","Tlaxcoapan","Tolcayuca","Tula de Allende","Tulancingo de Bravo","Tulancingo","Xochiatipan","Xochicoatlán","Yahualica","Zacualtipán de Ángeles","Zacualtipán","Zapotlán de Juárez","Zempoala","Zimapán"],
    "14":["Acatic","Acatlán de Juárez","Ahualulco de Mercado","Amacueca","Amatitán","Ameca","San Juanito de Escobedo","Arandas","El Arenal","Atemajac de Brizuela","Atengo","Atenguillo","Atotonilco el Alto","Atoyac","Autlán de Navarro","Ayotlán","Ayutla","La Barca","Bolaños","Cabo Corrientes","El Tuito","Casimiro Castillo","La Resolana","Cihuatlán","Zapotlán el Grande","Ciudad Guzmán","Cocula","Colotlán","Concepción de Buenos Aires","Cuautitlán de García Barragán","Cuautla","Cuquío","Chapala","Chimaltitán","Chiquilistlán","Degollado","Ejutla","Encarnación de Díaz","Etzatlán","El Grullo","Guachinango","Guadalajara","Hostotipaquillo","Huejúcar","Huejuquilla el Alto","La Huerta","Ixtlahuacán de los Membrillos","Ixtlahuacán del Río","Jalostotitlán","Jamay","Jesús María","Jilotlán de los Dolores","Jocotepec","Juanacatlán","Juchitlán","Lagos de Moreno","El Limón","Magdalena","Santa María del Oro","La Manzanilla de la Paz","Mascota","Mazamitla","Mexticacán",
         "Mezquitic","Mixtlán","Ocotlán","Ojuelos de Jalisco","Pihuamo","Poncitlán","Puerto Vallarta","Villa Purificación","Quitupan","El Salto","San Cristóbal de la Barranca","San Diego de Alejandría","San Juan de los Lagos","San Julián","San Marcos","San Martín de Bolaños","San Martín Hidalgo","San Miguel el Alto","Gómez Farías","San Sebastián del Sur","San Sebastián del Oeste","Santa María de los Ángeles","Sayula","Tala","Talpa de Allende","Tamazula de Gordiano","Tapalpa","Tecalitlán","Tecolotlán","Techaluta de Montenegro","Tenamaxtlán","Teocaltiche","Teocuitatlán de Corona","Tepatitlán de Morelos","Tequila","Teuchitlán","Tizapán el Alto","Tlajomulco de Zúñiga","San Pedro Tlaquepaque","Tlaquepaque","Tolimán","Tomatlán","Tonalá","Tonaya","Tonila","Totatiche","Tototlán","Tuxcacuesco","Tuxcueca","Tuxpan","Unión de San Antonio","Unión de Tula","Valle de Guadalupe","Valle de Juárez","San Gabriel","Villa Corona","Villa Guerrero","Villa Hidalgo","Cañadas de Obregón","Yahualica de González Gallo","Zacoalco de Torres","Zapopan","Zapotiltic","Zapotitlán de Vadillo","Zapotlán del Rey","Zapotlanejo","San Ignacio Cerro Gordo"],"México":["Acambay de Ruíz Castañeda","Villa de Acambay de Ruíz Castañeda","Acolman","Acolman de Nezahualcóyotl","Aculco","Aculco de Espinoza","Almoloya de Alquisiras","Almoloya de Juárez","Villa de Almoloya de Juárez","Almoloya del Río","Amanalco","Amanalco de Becerra","Amatepec","Amecameca","Amecameca de Juárez","Apaxco","Apaxco de Ocampo","Atenco","San Salvador Atenco","Atizapán","Santa Cruz Atizapán","Atizapán de Zaragoza","Ciudad López Mateos","Atlacomulco","Atlacomulco de Fabela","Atlautla","Atlautla de Victoria","Axapusco","Ayapango","Ayapango de Gabriel Ramos M.",
         "Calimaya","Calimaya de Díaz González","Capulhuac","Capulhuac de Mirafuentes","Coacalco de Berriozábal","San Francisco Coacalco","Coatepec Harinas","Cocotitlán","Coyotepec","Cuautitlán","Chalco","Chalco de Díaz Covarrubias","Chapa de Mota","Chapultepec","Chiautla","Chicoloapan","Chicoloapan de Juárez","Chiconcuac","Chiconcuac de Juárez","Chimalhuacán","Donato Guerra","Villa Donato Guerra","Ecatepec de Morelos","Ecatzingo","Ecatzingo de Hidalgo","Huehuetoca","Hueypoxtla","Huixquilucan","Huixquilucan de Degollado","Isidro Fabela","Tlazala de Fabela","Ixtapaluca","Ixtapan de la Sal","Ixtapan del Oro","Ixtlahuaca","Ixtlahuaca de Rayón","Xalatlaco","Jaltenco","Jilotepec","Jilotepec de Molina Enríquez","Jilotzingo","Santa Ana Jilotzingo","Jiquipilco","Jocotitlán","Ciudad de Jocotitlán","Joquicingo","Joquicingo de León Guzmán","Juchitepec","Juchitepec de Mariano Rivapalacio","Lerma","Lerma de Villada","Malinalco","Melchor Ocampo","Metepec","Mexicaltzingo","San Mateo Mexicaltzingo","Morelos","San Bartolo Morelos","Naucalpan de Juárez","Nezahualcóyotl","Ciudad Nezahualcóyotl","Nextlalpan","Santa Ana Nextlalpan","Nicolás Romero","Ciudad Nicolás Romero","Nopaltepec","Ocoyoacac","Ocuilan","Ocuilan de Arteaga","El Oro","El Oro de Hidalgo","Otumba","Otumba de Gómez Farías","Otzoloapan","Otzolotepec","Villa Cuauhtémoc","Ozumba","Ozumba de Alzate","Papalotla","La Paz","Los Reyes Acaquilpan","Polotitlán","Polotitlán de la Ilustración","Rayón","Santa María Rayón","San Antonio la Isla","San Felipe del Progreso","San Martín de las Pirámides","San Mateo Atenco","San Simón de Guerrero","Santo Tomás","Santo Tomás de los Plátanos","Soyaniquilpan de Juárez","San Francisco Soyaniquilpan","Sultepec","Sultepec de Pedro Ascencio de Alquisiras","Tecámac","Tecámac de Felipe Villanueva","Tejupilco","Tejupilco de Hidalgo","Temamatla","Temascalapa","Temascalcingo","Temascalcingo de José María Velasco","Temascaltepec","Temascaltepec de González","Temoaya","Tenancingo","Tenancingo de Degollado","Tenango del Aire","Tenango del Valle",
         "Tenango de Arista","Teoloyucan","Teotihuacán","Teotihuacán de Arista","Tepetlaoxtoc","Tepetlaoxtoc de Hidalgo","Tepetlixpa","Tepotzotlán","Tequixquiac","Texcaltitlán","Texcalyacac","San Mateo Texcalyacac","Texcoco","Texcoco de Mora","Tezoyuca","Tianguistenco","Santiago Tianguistenco de Galeana","Timilpan","San Andrés Timilpan","Tlalmanalco","Tlalmanalco de Velázquez","Tlalnepantla de Baz","Tlalnepantla","Tlatlaya","Toluca","Toluca de Lerdo","Tonatico","Tultepec","Tultitlán","Tultitlán de Mariano Escobedo","Valle de Bravo","Villa de Allende","San José Villa de Allende","Villa del Carbón","Villa Guerrero","Villa Victoria","Xonacatlán","Zacazonapan","Zacualpan","Zinacantepec","San Miguel Zinacantepec","Zumpahuacán","Zumpango","Zumpango de Ocampo","Cuautitlán Izcalli","Valle de Chalco Solidaridad","Xico","Luvianos","Villa Luvianos","San José del Rincón","San José del Rincón Centro","Tonanitla","Santa María Tonanitla"],
  "15":["Acuitzio","Acuitzio del Canje","Aguililla","Álvaro Obregón","Angamacutiro","Angamacutiro de la Unión","Angangueo","Mineral de Angangueo","Apatzingán","Apatzingán de la Constitución","Aporo","Aquila","Ario","Ario de Rosales","Arteaga","Briseñas","Briseñas de Matamoros","Buenavista","Buenavista Tomatlán","Carácuaro","Carácuaro de Morelos","Coahuayana","Coahuayana de Hidalgo","Coalcomán de Vázquez Pallares","Coeneo","Coeneo de la Libertad","Contepec","Copándaro","Copándaro de Galeana","Cotija","Cotija de la Paz","Cuitzeo","Cuitzeo del Porvenir","Charapan","Charo","Chavinda","Cherán","Chilchota","Chinicuila","Villa Victoria","Chucándiro","Churintzio","Churumuco","Churumuco de Morelos","Ecuandureo","Epitacio Huerta","Erongarícuaro","Gabriel Zamora","Lombardía","Hidalgo","Ciudad Hidalgo","La Huacana","Huandacareo","Huaniqueo","Huaniqueo de Morales","Huetamo","Huetamo de Núñez","Huiramba","Indaparapeo","Irimbo","Ixtlán","Ixtlán de los Hervores","Jacona","Jacona de Plancarte","Jiménez","Villa Jiménez","Jiquilpan","Jiquilpan de Juárez","Juárez","Benito Juárez","Jungapeo","Jungapeo de Juárez","Lagunillas","Madero","Villa Madero","Maravatío","Maravatío de Ocampo","Marcos Castellanos","San José de Gracia","Lázaro Cárdenas",
         "Ciudad Lázaro Cárdenas","Morelia","Morelos","Villa Morelos","Múgica","Nueva Italia de Ruiz","Nahuatzen","Nocupétaro","Nocupétaro de Morelos","Nuevo Parangaricutiro","Nuevo San Juan Parangaricutiro","Nuevo Urecho","Numarán","Ocampo","Pajacuarán","Panindícuaro","Parácuaro","Paracho","Paracho de Verduzco","Pátzcuaro","Penjamillo","Penjamillo de Degollado","Peribán","Peribán de Ramos","La Piedad","La Piedad de Cabadas","Purépero","Purépero de Echáiz","Puruándiro","Queréndaro","Quiroga","Cojumatlán de Régules","Los Reyes","Los Reyes de Salgado","Sahuayo","Sahuayo de Morelos","San Lucas","Santa Ana Maya","Salvador Escalante","Santa Clara del Cobre","Senguio","Susupuato","Susupuato de Guerrero","Tacámbaro","Tacámbaro de Codallos","Tancítaro","Tangamandapio","Santiago Tangamandapio","Tangancícuaro","Tangancícuaro de Arista","Tanhuato","Tanhuato de Guerrero","Taretan","Tarímbaro","Tepalcatepec","Tingambato","Tingüindín","Tiquicheo de Nicolás Romero","Tiquicheo","Tlalpujahua","Tlalpujahua de Rayón","Tlazazalca","Tocumbo","Tumbiscatío","Tumbiscatío de Ruiz","Turicato","Tuxpan","Tuzantla","Tzintzuntzan","Tzitzio","Uruapan","Venustiano Carranza","San Pedro Cahro","Villamar","Vista Hermosa","Vista Hermosa de Negrete","Yurécuaro","Zacapu","Zamora","Zamora de Hidalgo","Zináparo","Zinapécuaro","Zinapécuaro de Figueroa","Ziracuaretiro","Zitácuaro","Heróica Zitácuaro","José Sixto Verduzco","Pastor Ortiz"],
  "17":["Amacuzac","Atlatlahucan","Axochiapan","Ayala","Ciudad Ayala","Coatlán del Río","Cuautla","Cuernavaca","Emiliano Zapata","Huitzilac","Jantetelco","Jiutepec","Jojutla","Jonacatepec de Leandro Valle","Mazatepec","Miacatlán","Ocuituco","Puente de Ixtla","Temixco","Tepalcingo","Tepoztlán","Tetecala","Tetela del Volcán","Tlalnepantla","Tlaltizapán de Zapata","Tlaltizapán","Tlaquiltenango","Tlayacapan","Totolapan","Xochitepec","Yautepec","Yautepec de Zaragoza","Yecapixtla","Zacatepec","Zacatepec de Hidalgo","Zacualpan de Amilpas","Temoac"],
  "18":["Acaponeta","Ahuacatlán","Amatlán de Cañas","Compostela","Huajicori","Ixtlán del Río","Jala","Xalisco","Del Nayar","Jesús María","Rosamorada","Ruíz","San Blas","San Pedro Lagunillas","Santa María del Oro","Santiago Ixcuintla","Tecuala","Tepic","Tuxpan","La Yesca","Bahía de Banderas","Valle de Banderas"],
  "19":["Abasolo","Agualeguas","Los Aldamas","Allende","Ciudad de Allende","Anáhuac","Apodaca","Ciudad Apodaca","Aramberri","Bustamante","Cadereyta Jiménez","El Carmen","Carmen","Cerralvo","Ciudad Cerralvo","Ciénega de Flores","China","Doctor Arroyo","Doctor Coss","Doctor González","Galeana","García","San Pedro Garza García","General Bravo","General Escobedo","Ciudad General Escobedo","General Terán","Ciudad General Terán","General Treviño","General Zaragoza","General Zuazua","Guadalupe","Los Herreras","Higueras","Hualahuises","Iturbide","Juárez","Ciudad Benito Juárez","Lampazos de Naranjo","Linares","Marín","Melchor Ocampo","Mier y Noriega","Mina","Montemorelos","Monterrey","Parás","Pesquería","Los Ramones","Rayones","Sabinas Hidalgo","Ciudad Sabinas Hidalgo","Salinas Victoria","San Nicolás de los Garza","Hidalgo","Santa Catarina","Ciudad Santa Catarina","Santiago","Vallecillo","Villaldama","Ciudad de Villaldama"],
  "20":["Abejones","Acatlán de Pérez Figueroa","Asunción Cacalotepec","Asunción Cuyotepeji","Asunción Ixtaltepec","Asunción Nochixtlán","Asunción Ocotlán","Asunción Tlacolulita","Ayotzintepec","El Barrio de la Soledad","Calihualá","Candelaria Loxicha","Ciénega de Zimatlán","Ciudad Ixtepec","Coatecas Altas","Coicoyán de las Flores","La Compañía","Concepción Buenavista","Concepción Pápalo","Constancia del Rosario","Cosolapa","Cosoltepec","Cuilápam de Guerrero","Cuyamecalco Villa de Zaragoza","Chahuites","Chalcatongo de Hidalgo","Chiquihuitlán de Benito Juárez","Heroica Ciudad de Ejutla de Crespo","Eloxochitlán de Flores Magón","El Espinal","Tamazulápam del Espíritu Santo","Fresnillo de Trujano","Guadalupe Etla","Guadalupe de Ramírez","Guelatao de Juárez","Guevea de Humboldt","Mesones Hidalgo","Villa Hidalgo","Heroica Ciudad de Huajuapan de León","Huautepec","Huautla de Jiménez","Ixtlán de Juárez","Heroica Ciudad de Juchitán de Zaragoza","Loma Bonita","Magdalena Apasco","Magdalena Jaltepec","Santa Magdalena Jicotlán","Magdalena Mixtepec","Magdalena Ocotlán","Magdalena Peñasco","Magdalena Teitipac","Magdalena Tequisistlán","Magdalena Tlacotepec","Magdalena Zahuatlán","Mariscala de Juárez","Mártires de Tacubaya","Matías Romero Avendaño","Mazatlán Villa de Flores","Miahuatlán de Porfirio Díaz","Mixistlán de la Reforma","Monjas","Natividad","Nazareno Etla","Nejapa de Madero","Ixpantepec Nieves","Santiago Niltepec","Oaxaca de Juárez","Ocotlán de Morelos","La Pe","Pinotepa de Don Luis","Pluma Hidalgo","San José del Progreso",
         "Putla Villa de Guerrero","Santa Catarina Quioquitani","Reforma de Pineda","La Reforma","Reyes Etla","Rojas de Cuauhtémoc","Salina Cruz","San Agustín Amatengo","San Agustín Atenango","San Agustín Chayuco","San Agustín de las Juntas","San Agustín Etla","San Agustín Loxicha","San Agustín Tlacotepec","San Agustín Yatareni","San Andrés Cabecera Nueva","San Andrés Dinicuiti","San Andrés Huaxpaltepec","San Andrés Huayápam","San Andrés Ixtlahuaca","San Andrés Lagunas","San Andrés Nuxiño","San Andrés Paxtlán","San Andrés Sinaxtla","San Andrés Solaga","San Andrés Teotilálpam","San Andrés Tepetlapa","San Andrés Yaá","San Andrés Zabache","San Andrés Zautla","San Antonino Castillo Velasco","San Antonino el Alto","San Antonino Monte Verde","San Antonio Acutla","San Antonio de la Cal","San Antonio Huitepec","San Antonio Nanahuatípam","San Antonio Sinicahua","San Antonio Tepetlapa","San Baltazar Chichicápam","San Baltazar Loxicha","San Baltazar Yatzachi el Bajo","San Bartolo Coyotepec","San Bartolomé Ayautla","San Bartolomé Loxicha","San Bartolomé Quialana","San Bartolomé Yucuañe","San Bartolomé Zoogocho","San Bartolo Soyaltepec","San Bartolo Yautepec","San Bernardo Mixtepec","San Blas Atempa","San Carlos Yautepec","San Cristóbal Amatlán","San Cristóbal Amoltepec","San Cristóbal Lachirioag","San Cristóbal Suchixtlahuaca","San Dionisio del Mar","San Dionisio Ocotepec","San Dionisio Ocotlán","San Esteban Atatlahuca","San Felipe Jalapa de Díaz","San Felipe Tejalápam","San Felipe Usila","San Francisco Cahuacuá","San Francisco Cajonos","San Francisco Chapulapa","San Francisco Chindúa","San Francisco del Mar","San Francisco Huehuetlán","San Francisco Ixhuatán","San Francisco Jaltepetongo","San Francisco Lachigoló","San Francisco Logueche","San Francisco Nuxaño","San Francisco Ozolotepec","San Francisco Sola","San Francisco Telixtlahuaca","San Francisco Teopan","San Francisco Tlapancingo","San Gabriel Mixtepec","San Ildefonso Amatlán","San Ildefonso Sola","San Ildefonso Villa Alta","San Jacinto Amilpas","San Jacinto Tlacotepec","San Jerónimo Coatlán","San Jerónimo Silacayoapilla","San Jerónimo Sosola","San Jerónimo Taviche","San Jerónimo Tecóatl","San Jorge Nuchita","San José Ayuquila","San José Chiltepec","San José del Peñasco","San José Estancia Grande","San José Independencia","San José Lachiguiri","San José Tenango","San Juan Achiutla","San Juan Atepec","Ánimas Trujano","San Juan Bautista Atatlahuca",
         "San Juan Bautista Coixtlahuaca","San Juan Bautista Cuicatlán","San Juan Bautista Guelache","San Juan Bautista Jayacatlán","San Juan Bautista Lo de Soto","San Juan Bautista Suchitepec","San Juan Bautista Tlacoatzintepec","San Juan Bautista Tlachichilco","San Juan Bautista Tuxtepec","San Juan Cacahuatepec","San Juan Cieneguilla","San Juan Coatzóspam","San Juan Colorado","San Juan Comaltepec","San Juan Cotzocón","San Juan Chicomezúchil","San Juan Chilateca","San Juan del Estado","San Juan del Río","San Juan Diuxi","San Juan Evangelista Analco","San Juan Guelavía","San Juan Guichicovi","San Juan Ihualtepec","San Juan Juquila Mixes","San Juan Juquila Vijanos","San Juan Lachao","San Juan Lachigalla","San Juan Lajarcia","San Juan Lalana","San Juan de los Cués","San Juan Mazatlán","San Juan Mixtepec","San Juan Mixtepec Distrito 08","San Juan Mixtepec Distrito 26","San Juan Ñumí","San Juan Ozolotepec","San Juan Petlapa","San Juan Quiahije","San Juan Quiotepec","San Juan Sayultepec","San Juan Tabaá","San Juan Tamazola","San Juan Teita","San Juan Teitipac","San Juan Tepeuxila","San Juan Teposcolula","San Juan Yaeé","San Juan Yatzona","San Juan Yucuita","San Lorenzo","San Lorenzo Albarradas","San Lorenzo Cacaotepec","San Lorenzo Cuaunecuiltitla","San Lorenzo Texmelúcan","San Lorenzo Victoria","San Lucas Camotlán","San Lucas Ojitlán","San Lucas Quiaviní","San Lucas Zoquiápam","San Luis Amatlán","San Marcial Ozolotepec","San Marcos Arteaga","San Martín de los Cansecos","San Martín Huamelúlpam","San Martín Itunyoso","San Martín Lachilá","San Martín Peras","San Martín Tilcajete","San Martín Toxpalan","San Martín Zacatepec","San Mateo Cajonos","Capulálpam de Méndez","San Mateo del Mar","San Mateo Yoloxochitlán","San Mateo Etlatongo","San Mateo Nejápam","San Mateo Peñasco","San Mateo Piñas","San Mateo Río Hondo","San Mateo Sindihui","San Mateo Tlapiltepec","San Melchor Betaza","San Miguel Achiutla","San Miguel Ahuehuetitlán","San Miguel Aloápam","San Miguel Amatitlán","San Miguel Amatlán","San Miguel Coatlán","San Miguel Chicahua","San Miguel Chimalapa","San Miguel del Puerto","San Miguel del Río","San Miguel Ejutla","San Miguel el Grande","San Miguel Huautla","San Miguel Mixtepec","San Miguel Panixtlahuaca","San Miguel Peras","San Miguel Piedras","San Miguel Quetzaltepec","San Miguel Santa Flor","Villa Sola de Vega","San Miguel Soyaltepec","Temascal","San Miguel Suchixtepec","Villa Talea de Castro","San Miguel Tecomatlán","San Miguel Tenango","San Miguel Tequixtepec","San Miguel Tilquiápam","San Miguel Tlacamama","San Miguel Tlacotepec","San Miguel Tulancingo","San Miguel Yotao","San Nicolás","San Nicolás Hidalgo","San Pablo Coatlán","San Pablo Cuatro Venados","San Pablo Etla","San Pablo Huitzo","San Pablo Huixtepec","San Pablo Macuiltianguis","San Pablo Tijaltepec","San Pablo Villa de Mitla","San Pablo Yaganiza","San Pedro Amuzgos","San Pedro Apóstol","San Pedro Atoyac","San Pedro Cajonos","San Pedro Coxcaltepec Cántaros","San Pedro Comitancillo","San Pedro el Alto","San Pedro Huamelula","San Pedro Huilotepec","San Pedro Ixcatlán","San Pedro Ixtlahuaca","San Pedro Jaltepetongo","San Pedro Jicayán","San Pedro Jocotipac","San Pedro Juchatengo","San Pedro Mártir","San Pedro Mártir Quiechapa","San Pedro Mártir Yucuxaco","San Pedro Mixtepec","San Pedro Mixtepec Distrito 22","San Pedro Mixtepec Distrito 26","San Pedro Molinos","San Pedro Nopala","San Pedro Ocopetatillo","San Pedro Ocotepec","San Pedro Pochutla","San Pedro Quiatoni","San Pedro Sochiápam","San Pedro Tapanatepec","San Pedro Taviche","San Pedro Teozacoalco","San Pedro Teutila","San Pedro Tidaá","San Pedro Topiltepec","San Pedro Totolápam","Villa de Tututepec","Villa de Tututepec de Melchor Ocampo","San Pedro Yaneri","San Pedro Yólox","San Pedro y San Pablo Ayutla","Villa de Etla","San Pedro y San Pablo Teposcolula","San Pedro y San Pablo Tequixtepec","San Pedro Yucunama","San Raymundo Jalpan","San Sebastián Abasolo","San Sebastián Coatlán","San Sebastián Ixcapa","San Sebastián Nicananduta","San Sebastián Río Hondo","San Sebastián Tecomaxtlahuaca","San Sebastián Teitipac","San Sebastián Tutla","San Simón Almolongas","San Simón Zahuatlán","Santa Ana","Santa Ana Ateixtlahuaca","Santa Ana Cuauhtémoc","Santa Ana del Valle","Santa Ana Tavela","Santa Ana Tlapacoyan","Santa Ana Yareni","Santa Ana Zegache","Santa Catalina Quierí","Santa Catarina Cuixtla","Santa Catarina Ixtepeji","Santa Catarina Juquila","Santa Catarina Lachatao","Santa Catarina Loxicha","Santa Catarina Mechoacán","Santa Catarina Minas","Santa Catarina Quiané","Santa Catarina Tayata","Santa Catarina Ticuá","Santa Catarina Yosonotú","Santa Catarina Zapoquila","Santa Cruz Acatepec","Santa Cruz Amilpas","Santa Cruz de Bravo","Santa Cruz Itundujia","Santa Cruz Mixtepec","Santa Cruz Nundaco","Santa Cruz Papalutla","Santa Cruz Tacache de Mina","Santa Cruz Tacahua","Santa Cruz Tayata","Santa Cruz Xitla","Santa Cruz Xoxocotlán","Santa Cruz Zenzontepec","Santa Gertrudis","Santa Inés del Monte","Santa Inés Yatzeche","Santa Lucía del Camino","Santa Lucía Miahuatlán","Santa Lucía Monteverde","Santa Lucía Ocotlán","Santa María Alotepec","Santa María Apazco","Santa María la Asunción","Heroica Ciudad de Tlaxiaco","Ayoquezco de Aldama","Santa María Atzompa","Santa María Camotlán","Santa María Colotepec","Santa María Cortijo","Santa María Coyotepec","Santa María Chachoápam","Villa de Chilapa de Díaz","Santa María Chilchotla","Santa María Chimalapa","Santa María del Rosario","Santa María del Tule","Santa María Ecatepec","Santa María Guelacé","Santa María Guienagati","Santa María Huatulco","Santa María Huazolotitlán","Santa María Ipalapa","Santa María Ixcatlán","Santa María Jacatepec","Santa María Jalapa del Marqués","Santa María Jaltianguis","Santa María Lachixío","Santa María Mixtequilla","Santa María Nativitas","Santa María Nduayaco","Santa María Ozolotepec","Santa María Pápalo","Santa María Peñoles","Santa María Petapa","Santa María Quiegolani","Santa María Sola","Santa María Tataltepec","Santa María Tecomavaca","Santa María Temaxcalapa","Santa María Temaxcaltepec","Santa María Teopoxco","Santa María Tepantlali","Santa María Texcatitlán","Santa María Tlahuitoltepec","Santa María Tlalixtac","Santa María Tonameca","Santa María Totolapilla","Santa María Xadani","Santa María Yalina","Santa María Yavesía","Santa María Yolotepec","Santa María Yosoyúa","Santa María Yucuhiti","Santa María Zacatepec","Santa María Zaniza","Santa María Zoquitlán","Santiago Amoltepec","Santiago Apoala","Santiago Apóstol","Santiago Astata","Santiago Atitlán","Santiago Ayuquililla","Santiago Cacaloxtepec","Santiago Camotlán","Santiago Comaltepec","Santiago Chazumba","Santiago Choápam","Santiago del Río","Santiago Huajolotitlán","Santiago Huauclilla","Santiago Ihuitlán Plumas","Santiago Ixcuintepec","Santiago Ixtayutla","Santiago Jamiltepec","Santiago Jocotepec","Monte Negro","Santiago Juxtlahuaca","Santiago Lachiguiri","Santiago Lalopa","Santiago Laollaga","Santiago Laxopa","Santiago Llano Grande","Santiago Matatlán","Santiago Miltepec","Santiago Minas","Santiago Nacaltepec","Santiago Nejapilla","Santiago Nundiche","Santiago Nuyoó","Santiago Pinotepa Nacional","Santiago Suchilquitongo","Santiago Tamazola","Santiago Tapextla","Villa Tejúpam de la Unión","Santiago Tenango","Santiago Tepetlapa","Santiago Tetepec","Santiago Texcalcingo","Santiago Textitlán","Santiago Tilantongo","Santiago Tillo","Santiago Tlazoyaltepec","Santiago Xanica","Santiago Xiacuí","Santiago Yaitepec","Santiago Yaveo","Santiago Yolomécatl","Santiago Yosondúa","Santiago Yucuyachi","Santiago Zacatepec","Santiago Zoochila","Nuevo Zoquiápam","Santo Domingo Ingenio","Santo Domingo Albarradas","Santo Domingo Armenta","Santo Domingo Chihuitán","Santo Domingo de Morelos","Santo Domingo Ixcatlán","Santo Domingo Nuxaá","Santo Domingo Ozolotepec","Santo Domingo Petapa","Santo Domingo Roayaga","Santo Domingo Tehuantepec","Santo Domingo Teojomulco","Santo Domingo Tepuxtepec","Santo Domingo Tlatayápam","Santo Domingo Tomaltepec","Santo Domingo Tonalá","Santo Domingo Tonaltepec","Santo Domingo Xagacía","Santo Domingo Yanhuitlán","Santo Domingo Yodohino","Santo Domingo Zanatepec","Santos Reyes Nopala","Santos Reyes Pápalo","Santos Reyes Tepejillo","Santos Reyes Yucuná","Santo Tomás Jalieza","Santo Tomás Mazaltepec","Santo Tomás Ocotepec","Santo Tomás Tamazulapan","San Vicente Coatlán","San Vicente Lachixío","San Vicente Nuñú","Silacayoápam","Sitio de Xitlapehua","Soledad Etla","Villa de Tamazulápam del Progreso","Tanetze de Zaragoza","Taniche","Tataltepec de Valdés","Teococuilco de Marcos Pérez","Teotitlán de Flores Magón","Teotitlán del Valle","Teotongo","Tepelmeme Villa de Morelos","Heroica Villa Tezoatlán de Segura y Luna, Cuna de la Independencia de Oaxaca","San Jerónimo Tlacochahuaya","Tlacolula de Matamoros","Tlacotepec Plumas","Tlalixtac de Cabrera","Totontepec Villa de Morelos","Trinidad Zaachila","La Trinidad Vista Hermosa","Unión Hidalgo","Valerio Trujano","San Juan Bautista Valle Nacional","Villa Díaz Ordaz","Yaxe","Magdalena Yodocono de Porfirio Díaz","Yogana","Yutanduchi de Guerrero","Villa de Zaachila","San Mateo Yucutindoo","Zapotitlán Lagunas","Zapotitlán Palmas","Santa Inés de Zaragoza","Zimatlán de Álvarez"],
  "21":["Acajete","Acateno","San José Acateno","Acatlán","Acatlán de Osorio","Acatzingo","Acatzingo de Hidalgo","Acteopan","Ahuacatlán","Ahuatlán","Ahuazotepec","Ahuehuetitla","Ajalpan","Ciudad de Ajalpan","Albino Zertuche","Acaxtlahuacán de Albino Zertuche","Aljojuca","Altepexi","Amixtlán","Amozoc","Amozoc de Mota","Aquixtla","Atempan","Atexcal","San Martín Atexcal","Atlixco","Atoyatempan","Atzala","Atzitzihuacán","Santiago Atzitzihuacán","Atzitzintla","Axutla","Ayotoxco de Guerrero","Calpan","San Andrés Calpan","Caltepec","Camocuautla","Caxhuacan","Coatepec","Coatzingo","Cohetzala","Santa María Cohetzala","Cohuecan","Coronango","Santa María Coronango","Coxcatlán","Coyomeapan","Santa María Coyomeapan","Coyotepec","San Vicente Coyotepec",
         "Cuapiaxtla de Madero","Cuautempan","San Esteban Cuautempan","Cuautinchán","Cuautlancingo","San Juan Cuautlancingo","Cuayuca de Andrade","San Pedro Cuayuca","Cuetzalan del Progreso","Ciudad de Cuetzalan","Cuyoaco","Chalchicomula de Sesma","Ciudad Serdán","Chapulco","Chiautla","Ciudad de Chiautla de Tapia","Chiautzingo","San Lorenzo Chiautzingo","Chiconcuautla","Chichiquila","Chietla","Chigmecatitlán","Chignahuapan","Ciudad de Chignahuapan","Chignautla","Chila","Chila de la Sal","Honey","Chilchotla","Rafael J. García","Chinantla","Domingo Arenas","Eloxochitlán","Epatlán","San Juan Epatlán","Esperanza","Francisco Z. Mena","Metlaltoyuca","General Felipe Ángeles","San Pablo de las Tunas","Guadalupe","Guadalupe Victoria","Hermenegildo Galeana","Bienvenido","Huaquechula","Huatlatlauca","Huauchinango","Huehuetla","Huehuetlán el Chico","Huejotzingo","Hueyapan","Hueytamalco","Hueytlalpan","Huitzilan de Serdán","Huitzilan","Huitziltepec","Santa Clara Huitziltepec","Atlequizayan","Ixcamilpa de Guerrero","Ixcamilpa","Ixcaquixtla","San Juan Ixcaquixtla","Ixtacamaxtitlán","Ixtepec","Izúcar de Matamoros","Jalpan","Jolalpan","Jonotla","Jopala","Juan C. Bonilla","Cuanalá","Juan Galindo","Nuevo Necaxa","Juan N. Méndez","Atenayuca","Lafragua","Saltillo","Libres","Ciudad de Libres","La Magdalena Tlatlauquitepec","Mazapiltepec de Juárez","Mixtla","San Francisco Mixtla","Molcaxac","Cañada Morelos","Morelos Cañada","Naupan","Nauzontla","Nealtican","San Buenaventura Nealtican","Nicolás Bravo","Nopalucan","Nopalucan de la Granja","Ocotepec","Ocoyucan","Santa Clara Ocoyucan","Olintla","Oriental","Pahuatlán","Ciudad de Pahuatlán de Valle","Palmar de Bravo","Pantepec","Petlalcingo","Piaxtla","Puebla","Heroica Puebla de Zaragoza","Quecholac","Quimixtlán","Rafael Lara Grajales","Ciudad de Rafael Lara Grajales","Los Reyes de Juárez","San Andrés Cholula","San Antonio Cañada","San Diego la Mesa Tochimiltzingo","Tochimiltzingo","San Felipe Teotlalcingo","San Felipe Tepatlán","San Gabriel Chilac","San Gregorio Atzompa","San Jerónimo Tecuanipan","San Jerónimo Xayacatlán","San José Chiapa","San José Miahuatlán","San Juan Atenco","San Juan Atzompa","San Martín Texmelucan","San Martín Texmelucan de Labastida","San Martín Totoltepec","San Matías Tlalancaleca","San Miguel Ixitlán","San Miguel Xoxtla","San Nicolás Buenos Aires","San Nicolás de los Ranchos","San Pablo Anicano","San Pedro Cholula","Cholula de Rivadavia","San Pedro Yeloixtlahuaca","San Salvador el Seco","San Salvador el Verde","San Salvador Huixcolotla","San Sebastián Tlacotepec","Tlacotepec de Porfirio Díaz","Santa Catarina Tlaltempan","Santa Inés Ahuatempan","Santa Isabel Cholula","Santiago Miahuatlán","Huehuetlán el Grande","Santo Domingo Huehuetlán","Santo Tomás Hueyotlipan","Soltepec","Tecali de Herrera","Tecamachalco","Tecomatlán","Tehuacán","Tehuitzingo","Tenampulco","Teopantlán","Teotlalco","Tepanco de López","Tepango de Rodríguez","Tepatlaxco de Hidalgo","Tepeaca","Tepemaxalco","San Felipe Tepemaxalco","Tepeojuma","Tepetzintla","Tepexco","Tepexi de Rodríguez","Tepeyahualco","Tepeyahualco de Cuauhtémoc","Tetela de Ocampo","Ciudad de Tetela de Ocampo","Teteles de Avila Castillo","Teziutlán","Tianguismanalco","Tilapa","Tlacotepec de Benito Juárez","Tlacuilotepec","Tlachichuca","Tlahuapan","Santa Rita Tlahuapan","Tlaltenango","Tlanepantla","Tlaola","Tlapacoya","Tlapanalá","Tlatlauquitepec","Ciudad de Tlatlauquitepec","Tlaxco","Tochimilco","Tochtepec","Totoltepec de Guerrero","Tulcingo","Tulcingo de Valle","Tuzamapan de Galeana","Tzicatlacoyan","Venustiano Carranza","Vicente Guerrero","Santa María del Monte","Xayacatlán de Bravo","Xicotepec","Xicotepec de Juárez","Xicotlán","Xiutetelco","San Juan Xiutetelco","Xochiapulco","Cinco de Mayo","Xochiltepec","Xochitlán de Vicente Suárez","Xochitlán Todos Santos","Xochitlán","Yaonáhuac","Yehualtepec","Zacapala","Zacapoaxtla","Zacatlán","Zapotitlán","Zapotitlán Salinas","Zapotitlán de Méndez","Zaragoza","Zautla","Santiago Zautla","Zihuateutla","Zinacatepec","San Sebastián Zinacatepec","Zongozotla","Zoquiapan","Zoquitlán"],
"23":["Amealco de Bonfil","Pinal de Amoles","Arroyo Seco","Cadereyta de Montes","Colón","Corregidora","El Pueblito","Ezequiel Montes","Huimilpan","Jalpan de Serra","Landa de Matamoros","El Marqués","La Cañada","Pedro Escobedo","Peñamiller","Querétaro","Santiago de Querétaro","San Joaquín","San Juan del Río","Tequisquiapan","Tolimán"],
  "22":["Cozumel","Felipe Carrillo Puerto","Isla Mujeres","Othón P. Blanco","Benito Juárez","José María Morelos","Lázaro Cárdenas","Kantunilkín","Solidaridad","Tulum","Bacalar","Puerto Morelos"],
  "25":["Ahualulco","Ahualulco del Sonido 13","Alaquines","Aquismón","Armadillo de los Infante","Cárdenas","Catorce","Real de Catorce","Cedral","Cerritos","Cerro de San Pedro","Ciudad del Maíz","Ciudad Fernández","Tancanhuitz","Ciudad Valles","Coxcatlán","Charcas","Ebano","Guadalcázar","Huehuetlán","Lagunillas","Matehuala","Mexquitic de Carmona","Moctezuma","Rayón","Rioverde","Salinas","Salinas de Hidalgo","San Antonio","San Ciro de Acosta","San Luis Potosí","San Martín Chalchicuautla","San Nicolás Tolentino","Santa Catarina","Santa María del Río","Santo Domingo","San Vicente Tancuayalab","Soledad de Graciano Sánchez","Tamasopo","Tamazunchale","Tampacán","Tampamolón Corona","Tamuín","Tanlajás","Tanquián de Escobedo","Tierra Nueva","Vanegas","Venado","Villa de Arriaga","Villa de Guadalupe","Villa de la Paz","Villa de Ramos","Villa de Reyes","Villa Hidalgo","Villa Juárez","Axtla de Terrazas","Xilitla","Zaragoza","Villa de Zaragoza","Villa de Arista","Matlapa","El Naranjo"],
  "24":["Ahome","Los Mochis","Angostura","Badiraguato","Concordia","Cosalá","Culiacán","Culiacán Rosales","Choix","Elota","La Cruz","Escuinapa","Escuinapa de Hidalgo","El Fuerte","Guasave","Mazatlán","Mocorito","Rosario","El Rosario","Salvador Alvarado","Guamúchil","San Ignacio","Sinaloa","Sinaloa de Leyva","Navolato"],
 "26":["Aconchi","Agua Prieta","Alamos","Altar","Arivechi","Arizpe","Atil","Bacadéhuachi","Bacanora","Bacerac","Bacoachi","Bácum","Banámichi","Baviácora","Bavispe","Benjamín Hill","Caborca","Heroica Caborca","Cajeme","Ciudad Obregón","Cananea","Heroica Ciudad de Cananea","Carbó","La Colorada","Cucurpe","Cumpas","Divisaderos","Empalme","Etchojoa","Fronteras","Granados","Guaymas","Heroica Guaymas","Hermosillo","Huachinera","Huásabas","Huatabampo","Huépac","Imuris","Magdalena","Magdalena de Kino","Mazatán","Moctezuma","Naco","Nácori Chico","Nacozari de García","Navojoa","Nogales","Heroica Nogales","Onavas","Opodepe","Oquitoa","Pitiquito","Puerto Peñasco","Quiriego","Rayón","Rosario","Sahuaripa","San Felipe de Jesús","San Javier","San Luis Río Colorado","San Miguel de Horcasitas","San Pedro de la Cueva","Santa Ana","Santa Cruz","Sáric","Soyopa","Suaqui Grande","Tepache","Trincheras","Tubutama","Ures","Heroica Ciudad de Ures","Villa Hidalgo","Villa Pesqueira","Villa Pesqueira (Mátape)","Yécora","General Plutarco Elías Calles","Sonoyta","Benito Juárez","Villa Juárez","San Ignacio Río Muerto"],
 "27":["Balancán","Cárdenas","Centla","Frontera","Centro","Villahermosa","Comalcalco","Cunduacán","Emiliano Zapata","Huimanguillo","Jalapa","Jalpa de Méndez","Jonuta","Macuspana","Nacajuca","Paraíso","Tacotalpa","Teapa","Tenosique","Tenosique de Pino Suárez"],
 "29":["Abasolo","Aldama","Altamira","Antiguo Morelos","Burgos","Bustamante","Camargo","Ciudad Camargo","Casas","Ciudad Madero","Cruillas","Gómez Farías","González","Güémez","Guerrero","Nueva Ciudad Guerrero","Gustavo Díaz Ordaz","Ciudad Gustavo Díaz Ordaz","Hidalgo","Jaumave","Jiménez","Santander Jiménez","Llera","Llera de Canales","Mainero","Villa Mainero","El Mante","Ciudad Mante","Matamoros","Heroica Matamoros","Méndez","Mier","Miguel Alemán","Ciudad Miguel Alemán","Miquihuana","Nuevo Laredo","Nuevo Morelos","Ocampo","Padilla","Nueva Villa de Padilla","Palmillas","Reynosa","Río Bravo","Ciudad Río Bravo","San Carlos","San Fernando","San Nicolás","Soto la Marina","Tampico","Tula","Ciudad Tula","Valle Hermoso","Victoria","Ciudad Victoria","Villagrán","Xicoténcatl"],
 "28":["Amaxac de Guerrero","Apetatitlán de Antonio Carvajal","Apetatitlán","Atlangatepec","Atltzayanca","Atlzayanca","Apizaco","Ciudad de Apizaco","Calpulalpan","Heroica Ciudad de Calpulalpan","El Carmen Tequexquitla","Villa de El Carmen Tequexquitla","Cuapiaxtla","Cuaxomulco","Chiautempan","Santa Ana Chiautempan","Muñoz de Domingo Arenas","Muñoz","Españita","Huamantla","Hueyotlipan","Ixtacuixtla de Mariano Matamoros","Villa Mariano Matamoros","Ixtenco","Mazatecochco de José María Morelos","Mazatecochco","Contla de Juan Cuamatzi","Contla","Tepetitla de Lardizábal","Tepetitla","Sanctórum de Lázaro Cárdenas","Sanctórum","Nanacamilpa de Mariano Arista","Ciudad de Nanacamilpa","Acuamanala de Miguel Hidalgo","Acuamanala","Natívitas","Panotla","San Pablo del Monte","Villa Vicente Guerrero","Santa Cruz Tlaxcala","Tenancingo","Teolocholco","Tepeyanco","Terrenate","Tetla de la Solidaridad","Tetla","Tetlatlahuca","Tlaxcala","Tlaxcala de Xicohténcatl","Tlaxco","Tocatlán","Totolac","San Juan Totolac","Ziltlaltépec de Trinidad Sánchez Santos","Zitlaltépec","Tzompantepec","Xaloztoc","Xaltocan","Papalotla de Xicohténcatl","Papalotla","Xicohtzinco","Yauhquemehcan","San Dionisio Yauhquemehcan","Zacatelco","Benito Juárez","Emiliano Zapata","Lázaro Cárdenas","La Magdalena Tlaltelulco","San Damián Texóloc","San Francisco Tetlanohcan","San Jerónimo Zacualpan","San José Teacalco","San Juan Huactzinco","San Lorenzo Axocomanitla","San Lucas Tecopilco","Santa Ana Nopalucan","Santa Apolonia Teacalco","Santa Catarina Ayometla","Santa Cruz Quilehtla","Santa Isabel Xiloxoxtla"],
 "30":["Acajete","Acatlán","Acayucan","Actopan","Acula","Acultzingo","Camarón de Tejeda","Alpatláhuac","Alto Lucero de Gutiérrez Barrios","Alto Lucero","Altotonga","Alvarado","Amatitlán","Naranjos Amatlán","Naranjos",
         "Amatlán de los Reyes","Angel R. Cabada","Ángel R. Cabada","La Antigua","José Cardel","Apazapan","Aquila","Astacinga","Atlahuilco","Atoyac","Atzacan","Atzalan","Tlaltetela","Ayahualulco","Banderilla","Benito Juárez","Boca del Río","Calcahualco","Camerino Z. Mendoza","Ciudad Mendoza","Carrillo Puerto","Tamarindo","Catemaco","Cazones de Herrera","Cerro Azul","Citlaltépetl","Citlaltépec","Coacoatzintla","Coahuitlán","Progreso de Zaragoza","Coatepec","Coatzacoalcos","Coatzintla","Coetzala","Colipa","Comapa","Córdoba","Cosamaloapan de Carpio","Cosamaloapan","Cosautlán de Carvajal","Coscomatepec","Coscomatepec de Bravo","Cosoleacaque","Cotaxtla","Coxquihui","Coyutla","Cuichapa","Cuitláhuac","Chacaltianguis","Chalma","Chiconamel","Chiconquiaco","Chicontepec","Chicontepec de Tejeda","Chinameca","Chinampa de Gorostiza","Las Choapas","Chocamán","Chontla","Chumatlán","Emiliano Zapata","Dos Ríos","Espinal","Filomeno Mata","Fortín","Fortín de las Flores","Gutiérrez Zamora","Hidalgotitlán","Huatusco","Huatusco de Chicuellar","Huayacocotla","Hueyapan de Ocampo","Huiloapan de Cuauhtémoc","Ignacio de la Llave","Ilamatlán","Isla","Ixcatepec","Ixhuacán de los Reyes","Ixhuatlán del Café","Ixhuatlancillo","Ixhuatlán del Sureste","Ixhuatlán de Madero","Ixmatlahuacan","Ixtaczoquitlán","Jalacingo","Xalapa","Xalapa-Enríquez","Jalcomulco","Jáltipan","Jáltipan de Morelos","Jamapa","Jesús Carranza","Xico","Jilotepec","Juan Rodríguez Clara","Juchique de Ferrer","Landero y Coss","Lerdo de Tejada","Magdalena","Maltrata","Manlio Fabio Altamirano","Mariano Escobedo","Martínez de la Torre","Mecatlán","Mecayapan","Medellín de Bravo","Medellín","Miahuatlán","Las Minas","Minatitlán","Misantla","Mixtla de Altamirano","Moloacán","Naolinco","Naolinco de Victoria","Naranjal","Nautla","Nogales","Oluta","Omealca","Orizaba","Otatitlán","Oteapan","Ozuluama de Mascareñas","Pajapan","Pánuco","Papantla","Papantla de Olarte","Paso del Macho","Paso de Ovejas","La Perla","Perote","Platón Sánchez","Playa Vicente","Poza Rica de Hidalgo","Las Vigas de Ramírez","Pueblo Viejo","Cd. Cuauhtémoc","Puente Nacional","Rafael Delgado","Rafael Lucio","Los Reyes","Río Blanco","Saltabarranca","San Andrés Tenejapan","San Andrés Tuxtla","San Juan Evangelista","Santiago Tuxtla","Sayula de Alemán","Soconusco","Sochiapa","Soledad Atzompa","Soledad de Doblado","Soteapan","Tamalín","Tamiahua","Tampico Alto","Tancoco","Tantima","Tantoyuca","Tatatila","Castillo de Teayo","Tecolutla","Tehuipango","Álamo Temapache","Álamo","Tempoal","Tempoal de Sánchez","Tenampa","Tenochtitlán","Teocelo","Tepatlaxco","Tepetlán","Tepetzintla","Tequila","José Azueta","Villa Azueta","Texcatepec","Texhuacán","Texistepec","Tezonapa","Tierra Blanca","Tihuatlán","Tlacojalpan","Tlacolulan","Tlacotalpan","Tlacotepec de Mejía","Tlachichilco","Tlalixcoyan","Tlalnelhuayocan","Tlapacoyan","Tlaquilpa","Tlilapan","Tomatlán","Tonayán","Totutla","Tuxpan","Túxpam de Rodríguez Cano","Tuxtilla","Ursulo Galván","Vega de Alatorre","Veracruz","Villa Aldama","Xoxocotla","Yanga","Yecuatla","Zacualpan","Zaragoza","Zentla","Colonia Manuel González","Zongolica","Zontecomatlán de López y Fuentes","Zozocolco de Hidalgo","Agua Dulce","El Higo","Nanchital de Lázaro Cárdenas del Río","Tres Valles","Carlos A. Carrillo","Tatahuicapan de Juárez","Tatahuicapan","Uxpanapa","Poblado 10","San Rafael","Santiago Sochiapan","Xochiapa"],
    "31":["Abalá","Acanceh","Akil","Baca","Bokobá","Buctzotz","Cacalchén","Calotmul","Cansahcab","Cantamayec","Celestún","Cenotillo","Conkal","Cuncunul","Cuzamá","Chacsinkín","Chankom","Chapab","Chemax","Chicxulub Pueblo","Chichimilá","Chikindzonot","Chocholá","Chumayel","Dzán","Dzemul","Dzidzantún","Dzilam de Bravo","Dzilam González","Dzitás","Dzoncauich","Espita","Halachó","Hocabá","Hoctún","Homún","Huhí","Hunucmá","Ixil","Izamal","Kanasín","Kantunil","Kaua","Kinchil","Kopomá","Mama","Maní","Maxcanú","Mayapán","Mérida","Mocochá","Motul","Motul de Carrillo Puerto","Muna","Muxupip","Opichén","Oxkutzcab","Panabá","Peto","Progreso","Quintana Roo","Río Lagartos","Sacalum","Samahil","Sanahcat","San Felipe","Santa Elena","Seyé","Sinanché","Sotuta","Sucilá","Sudzal","Suma","Tahdziú","Tahmek","Teabo","Tecoh","Tekal de Venegas","Tekantó","Tekax","Tekax de Álvaro Obregón","Tekit","Tekom","Telchac Pueblo","Telchac","Telchac Puerto","Temax","Temozón","Tepakán","Tetiz","Teya","Ticul","Timucuy","Tinum","Tixcacalcupul","Tixkokob","Tixmehuac","Tixpéhual","Tizimín","Tunkás","Tzucacab","Uayma","Ucú","Umán","Valladolid","Xocchel","Yaxcabá","Yaxkukul","Yobaín"],
    "32":["Apozol","Apulco","Atolinga","Benito Juárez","Florencia","Calera","Víctor Rosales","Cañitas de Felipe Pescador","Concepción del Oro","Cuauhtémoc","San Pedro Piedra Gorda","Chalchihuites","Fresnillo","Trinidad García de la Cadena","La Estanzuela","Genaro Codina","General Enrique Estrada","General Francisco R. Murguía","Nieves","El Plateado de Joaquín Amaro","General Pánfilo Natera","Guadalupe","Huanusco","Jalpa","Jerez","Jerez de García Salinas","Jiménez del Teul","Juan Aldama","Juchipila","Loreto","Luis Moya","Mazapil","Melchor Ocampo","Mezquital del Oro","Miguel Auza","Momax","Monte Escobedo","Morelos","Moyahua de Estrada","Nochistlán de Mejía","Noria de Ángeles","Ojocaliente","Pánuco","Pinos","Río Grande","Sain Alto","El Salvador","Sombrerete","Susticacán","Tabasco","Tepechitlán","Tepetongo","Teúl de González Ortega","Tlaltenango de Sánchez Román","Valparaíso","Vetagrande","Villa de Cos","Villa García","Villa González Ortega","Villa Hidalgo","Villanueva","Zacatecas","Trancoso","Santa María de la Paz"]};

    Preparatorias=
[
      {
      "Clave": "23DBP0001F     ",
      "Nombre": "CENTRO DE ESTUDIOS DE BACHILLERATO 5/9 JUSTO SIERRA MENDEZ.                     ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "BACALAR                                 ",
      "Servicio": "CEB                                                                             ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DBP0002E     ",
      "Nombre": "CENTRO DE ESTUDIOS DE BACHILLERATO 5/10 PROFR. RAFAEL RAMIREZ CASTAÑEDA         ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "FELIPE CARRILLO PUERTO                  ",
      "Servicio": "CEB                                                                             ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DCM0001H     ",
      "Nombre": "CENTRO DE ESTUDIOS TECNOLÓGICOS DEL MAR NÚM. 10                                 ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "CETMAR                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DCM0002G     ",
      "Nombre": "CENTRO DE ESTUDIOS TECNOLÓGICOS DEL MAR NÚM. 41                                 ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "CETMAR                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DCM0033Z     ",
      "Nombre": "CENTRO DE ESTUDIOS TECNOLÓGICOS DEL MAR NO. 33                                  ",
      "Entidad_federativa": 23,
    "Municipio": "Cozumel",
      "Colonia": "COZUMEL                                 ",
      "Servicio": "CETMAR                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DCM0038V     ",
      "Nombre": "CENTRO DE ESTUDIOS TECNOLÓGICOS DEL MAR NÚM.36                                  ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "CETMAR                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DCT0001R     ",
      "Nombre": "CENTRO DE BACHILLERATO TECNOLÓGICO INDUSTRIAL Y DE SERVICIOS NÚM. 214           ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "CBTIS                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DCT0159Q     ",
      "Nombre": "CENTRO DE BACHILLERATO TECNOLÓGICO INDUSTRIAL Y DE SERVICIOS NÚM. 28            ",
      "Entidad_federativa": 23,
    "Municipio": "Cozumel",
      "Colonia": "COZUMEL                                 ",
      "Servicio": "CBTIS                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DCT0245M     ",
      "Nombre": "CENTRO DE BACHILLERATO TECNOLÓGICO INDUSTRIAL Y DE SERVICIOS NÚM. 72            ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "FELIPE CARRILLO PUERTO                  ",
      "Servicio": "CBTIS                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DCT0253V     ",
      "Nombre": "CENTRO DE BACHILLERATO TECNOLÓGICO INDUSTRIAL Y DE SERVICIOS NÚM. 253           ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "CBTIS                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DCT0272J     ",
      "Nombre": "CENTRO DE BACHILLERATO TECNOLÓGICO INDUSTRIAL Y DE SERVICIOS NÚM.272            ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "CBTIS                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DCT0375F     ",
      "Nombre": "CENTRO DE BACHILLERATO TECNOLÓGICO INDUSTRIAL Y DE SERVICIOS NÚM. 111           ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "CBTIS                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DER0001A     ",
      "Nombre": "CENTRO DE ATENCION PARA ESTUDIANTES CON DISCAPACIDAD                            ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "FELIPE CARRILLO PUERTO                  ",
      "Servicio": "CAED                                                                            ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DER0002Z     ",
      "Nombre": "CENTRO DE ATENCION PARA ESTUDIANTES CON DISCAPACIDAD                            ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "CAED                                                                            ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DER0003Z     ",
      "Nombre": "CENTRO DE ATENCION PARA ESTUDIANTES CON DISCAPACIDAD                            ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "CAED                                                                            ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DER0004Y     ",
      "Nombre": "CENTRO DE ATENCION PARA ESTUDIANTES CON DISCAPACIDAD                            ",
      "Entidad_federativa": 23,
    "Municipio": "Cozumel",
      "Colonia": "COZUMEL                                 ",
      "Servicio": "CAED                                                                            ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DER0005X     ",
      "Nombre": "CENTRO DE ATENCION PARA ESTUDIANTES CON DISCAPACIDAD                            ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "CAED                                                                            ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DPT0001V     ",
      "Nombre": "PLANTEL CONALEP 009. CANCUN                                                     ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "CONALEP                                                                         ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DPT0002U     ",
      "Nombre": "PLANTEL CONALEP 065. COZUMEL                                                    ",
      "Entidad_federativa": 23,
    "Municipio": "Cozumel",
      "Colonia": "COZUMEL                                 ",
      "Servicio": "CONALEP                                                                         ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DPT0003T     ",
      "Nombre": "PLANTEL CONALEP 102. FELIPE CARRILLO PUERTO                                     ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "FELIPE CARRILLO PUERTO                  ",
      "Servicio": "CONALEP                                                                         ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DPT0004S     ",
      "Nombre": "PLANTEL CONALEP 007. LIC. JESUS MARTINEZ ROSS- CHETUMAL                         ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "CONALEP                                                                         ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DPT0005R     ",
      "Nombre": "PLANTEL CONALEP 286. CANCUN II                                                  ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "CONALEP                                                                         ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DPT0006Q     ",
      "Nombre": "PLANTEL CONALEP 298. CANCUN III                                                 ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "CONALEP                                                                         ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DPT0007P     ",
      "Nombre": "PLANTEL CONALEP 297. PLAYA DEL CARMEN                                           ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "CONALEP                                                                         ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DTA0011Z     ",
      "Nombre": "CENTRO DE BACHILLERATO TECNOLÓGICO AGROPECUARIO NÚM. 11                         ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "CBTA                                                                            ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DTA0080W     ",
      "Nombre": "CENTRO DE BACHILLERATO TECNOLÓGICO AGROPECUARIO NÚM. 80                         ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "CHUNHUHUB                               ",
      "Servicio": "CBTA                                                                            ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DTA0186P     ",
      "Nombre": "CENTRO DE BACHILLERATO TECNOLÓGICO AGROPECUARIO NÚM. 186                        ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "Kantunilkín",
      "Servicio": "CBTA                                                                            ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23DTA0291Z     ",
      "Nombre": "CENTRO DE BACHILLERATO TECNOLÓGICO AGROPECUARIO NÚM. 291                        ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "DZIUCHE                                 ",
      "Servicio": "CBTA                                                                            ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0001A     ",
      "Nombre": "COLEGIO DE BACHILLERES CHETUMAL UNO                                             ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0002Z     ",
      "Nombre": "COLEGIO DE BACHILLERES PLANTEL CANCUN UNO                                       ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0003Z     ",
      "Nombre": "COLEGIO DE BACHILLERES BACALAR                                                  ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "BACALAR                                 ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0004Y     ",
      "Nombre": "COLEGIO DE BACHILLERES JOSE MARIA MORELOS                                       ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "JOSE MARIA MORELOS                      ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0005X     ",
      "Nombre": "COLEGIO DE BACHILLERES RIO HONDO                                                ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "PUCTE",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0006W     ",
      "Nombre": "COLEGIO DE BACHILLERES ISLA MUJERES                                             ",
      "Entidad_federativa": 23,
      "Municipio": "Isla Mujeres",
      "Colonia": "ISLA MUJERES                            ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0007V     ",
      "Nombre": "COLEGIO DE BACHILLERES COZUMEL                                                  ",
      "Entidad_federativa": 23,
    "Municipio": "Cozumel",
      "Colonia": "COZUMEL                                 ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0008U     ",
      "Nombre": "COLEGIO DE BACHILLERES CHETUMAL DOS                                             ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0009T     ",
      "Nombre": "COLEGIO DE BACHILLERES PLANTEL TIHOSUCO                                         ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "TIHOSUCO                                ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0010I     ",
      "Nombre": "COLEGIO DE BACHILLERES CARLOS A.MADRAZO                                         ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CARLOS A. MADRAZO                       ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0011H     ",
      "Nombre": "COLEGIO DE BACHILLERES PLAYA DEL CARMEN                                         ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0012G     ",
      "Nombre": "COLEGIO DE BACHILLERES NICOLAS BRAVO                                            ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "NICOLAS BRAVO                           ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0013F     ",
      "Nombre": "COLEGIO DE BACHILLERES CANCUN DOS                                               ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0014E     ",
      "Nombre": "COLEGIO DE BACHILLERES CENTRO DE SERVICIOS ACADEMICOS INTEGRALES CANCUN         ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0015D     ",
      "Nombre": "COLEGIO DE BACHILLERES CENTRO DE SERVICIOS ACADEMICOS INTEGRALES CHETUMAL       ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0017B     ",
      "Nombre": "COLEGIO DE BACHILLERES IGNACIO ZARAGOZA                                         ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "IGNACIO ZARAGOZA                        ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0018A     ",
      "Nombre": "COLEGIO DE BACHILLERES SABAN                                                    ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "SABAN                                   ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0019Z     ",
      "Nombre": "COLEGIO DE BACHILLERES CENTRO DE SERV. ACADEMICOS INTEGRALES PLAYA DEL CARMEN   ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0021O     ",
      "Nombre": "COLEGIO DE BACHILLERES PLANTEL CANCUN TRES BONFIL                               ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "ALFREDO V. BONFIL                       ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0022N     ",
      "Nombre": "COLEGIO DE BACHILLERES SEÑOR                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "SEÑOR                                   ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0023M     ",
      "Nombre": "COLEGIO DE BACHILLERES PLANTEL CANCUN CUATRO                                    ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0024L     ",
      "Nombre": "COLEGIO DE BACHILLERES PLANTEL CIUDAD MUJERES                                   ",
      "Entidad_federativa": 23,
      "Municipio": "Isla Mujeres",
      "Colonia": "RANCHO VIEJO                            ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0025K     ",
      "Nombre": "COLEGIO DE BACHILLERES PLANTEL PRESIDENTE JUAREZ                                ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "PRESIDENTE JUAREZ                       ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0026J     ",
      "Nombre": "COLEGIO DE BACHILLERES PLANTEL MAYA BALAM                                       ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "MAYA BALAM                              ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0027I     ",
      "Nombre": "COLEGIO DE BACHILLERES PLANTEL CANDELARIA                                       ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "CANDELARIA                              ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECB0028H     ",
      "Nombre": "COLEGIO DE BACHILLERES PLANTEL PUERTO MORELOS                                   ",
      "Entidad_federativa": 23,
      "Municipio": "Puerto Morelos",
      "Colonia": "PUERTO MORELOS                          ",
      "Servicio": "BACHILLERES                                                                     ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ECT0001Q     ",
      "Nombre": "EVA SAMANO DE LÓPEZ MATEOS                                                      ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "EVA SAMANO                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EEX0001K     ",
      "Nombre": "PREPARATORIA ABIERTA QUINTANA ROO                                               ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PREP. ABIERTA                                                                   ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0001H     ",
      "Nombre": "EMSAD X-PICHIL                                                                  ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "X-PICHIL                                ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0002G     ",
      "Nombre": "EMSAD NOH-BEC                                                                   ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "NOH-BEC                                 ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0003F     ",
      "Nombre": "EMSAD ZAMORA                                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "ZAMORA                                  ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0004E     ",
      "Nombre": "EMSAD SAN PEDRO PERALTA                                                         ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "SAN PEDRO PERALTA                       ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0005D     ",
      "Nombre": "EMSAD VALLEHERMOSO                                                              ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "VALLEHERMOSO                            ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0007B     ",
      "Nombre": "EMSAD X-HAZIL SUR                                                               ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "X-HAZIL SUR                             ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0008A     ",
      "Nombre": "EMSAD CAOBAS                                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CAOBAS                                  ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0009Z     ",
      "Nombre": "EMSAD DIVORCIADOS                                                               ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "LOS DIVORCIADOS                         ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0012N     ",
      "Nombre": "EMSAD COBA                                                                      ",
      "Entidad_federativa": 23,
      "Municipio": "Tulum",
      "Colonia": "COBA                                    ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0013M     ",
      "Nombre": "EMSAD LAGUNA KANA                                                               ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "LAGUNA KANA                             ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0014L     ",
      "Nombre": "EMSAD CHANCHEN I                                                                ",
      "Entidad_federativa": 23,
      "Municipio": "Tulum",
      "Colonia": "CHANCHEN PRIMERO                        ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0016J     ",
      "Nombre": "EMSAD BLANCA FLOR                                                               ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "BLANCA FLOR                             ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0017I     ",
      "Nombre": "EMSAD LIMONES                                                                   ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "LIMONES                                 ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0019G     ",
      "Nombre": "EMSAD ALTOS DE SEVILLA                                                          ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "ALTOS DE SEVILLA                        ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0020W     ",
      "Nombre": "EMSAD CHIQUILA                                                                  ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "CHIQUILA                                ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0021V     ",
      "Nombre": "EMSAD CHUN-YAH                                                                  ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "CHUN-YAH                                ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0022U     ",
      "Nombre": "EMSAD RIO VERDE                                                                 ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "RIO VERDE                               ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0024S     ",
      "Nombre": "EMSAD PUERTO AVENTURAS                                                          ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PUERTO AVENTURAS                        ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0025R     ",
      "Nombre": "EMSAD JOSEFA ORTIZ DE DOMINGUEZ                                                 ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "JOSEFA ORTIZ DE DOMINGUEZ               ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0026Q     ",
      "Nombre": "EMSAD MAHAHUAL                                                                  ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "MAHAHUAL                                ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23EMS0027P     ",
      "Nombre": "EMSAD MIGUEL ALEMAN                                                             ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "MIGUEL ALEMAN                           ",
      "Servicio": "EMSAD                                                                           ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETC0001Q     ",
      "Nombre": "COLEGIO DE ESTUDIOS CIENTÍFICOS Y TECNOLÓGICOS UNIDAD CANCUN I                  ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "CECYTE                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETC0002P     ",
      "Nombre": "COLEGIO DE ESTUDIOS CIENTÍFICOS Y TECNOLÓGICOS UNIDAD CHETUMAL                  ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "CECYTE                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETC0003O     ",
      "Nombre": "COLEGIO DE ESTUDIOS CIENTÍFICOS Y TECNOLÓGICOS UNIDAD TULUM                     ",
      "Entidad_federativa": 23,
      "Municipio": "Tulum",
      "Colonia": "TULUM                                   ",
      "Servicio": "CECYTE                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETC0004N     ",
      "Nombre": "COLEGIO DE ESTUDIOS CIENTÍFICOS Y TECNOLÓGICOS UNIDAD CANCUN II                 ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "CECYTE                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETC0005M     ",
      "Nombre": "COLEGIO DE ESTUDIOS CIENTÍFICOS Y TECNOLÓGICOS UNIDAD PLAYA DEL CARMEN          ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "CECYTE                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETC0006L     ",
      "Nombre": "COLEGIO DE ESTUDIOS CIENTÍFICOS Y TECNOLÓGICOS UNIDAD LEONA VICARIO             ",
      "Entidad_federativa": 23,
      "Municipio": "Puerto Morelos",
      "Colonia": "LEONA VICARIO                           ",
      "Servicio": "CECYTE                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETC0007K     ",
      "Nombre": "COLEGIO DE ESTUDIOS CIENTÍFICOS Y TECNOLÓGICOS UNIDAD CANCUN III                ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "CECYTE                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETC0008J     ",
      "Nombre": "COLEGIO DE ESTUDIOS CIENTÍFICOS Y TECNOLÓGICOS UNIDAD CANCUN IV                 ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "CECYTE                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETC0009I     ",
      "Nombre": "COLEGIO DE ESTUDIOS CIENTÍFICOS Y TECNOLÓGICOS DE QUINTANA ROO PLANTEL PLAYA DEL",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "CECYTE                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0001Z     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "ESTEBAN BACA CALDERON                   ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0002Y     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "CHUNHUAS                                ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0003X     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "EL CEDRAL                               ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0004W     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "LAGUNA GUERRERO                         ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0005V     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "LUIS ECHEVERRIA ALVAREZ                 ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0006U     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO                                                    ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "EL NARANJAL                             ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0007T     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "REFORMA                                 ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0008S     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO                                                    ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "SANTA GERTRUDIS                         ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0009R     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "CHUMPON                                 ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0010G     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "SAN ISIDRO LA LAGUNA                    ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0011F     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO BUENAVISTA                                         ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "BUENAVISTA                              ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0012E     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO NUEVO JERUSALEN                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "NUEVO JERUSALEN                         ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0013D     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO DZULA                                              ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "DZULA                                   ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0014C     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO PETCACAB                                           ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "PETCACAB                                ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0015B     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SAN SILVERIO                                       ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "SAN SILVERIO                            ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0016A     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SANTA MARIA PONIENTE                               ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "SANTA MARIA PONIENTE                    ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0017Z     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO TEPICH                                             ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "TEPICH                                  ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0018Z     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO GAVILANES                                          ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "GAVILANES                               ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0019Y     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO KANCABCHEN                                         ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "KANCABCHEN                              ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0020N     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO PUERTO ARTURO                                      ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "PUERTO ARTURO                           ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0021M     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO AGUA AZUL                                          ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "AGUA AZUL                               ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0022L     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO EL TINTAL                                          ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "EL TINTAL                               ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0023K     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO HOLBOX                                             ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "HOLBOX                                  ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0024J     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SAN ANGEL                                          ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "SAN ANGEL                               ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0025I     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SAN FRANCISCO                                      ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "SAN FRANCISCO                           ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0026H     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO TRES REYES                                         ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "TRES REYES                              ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0027G     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO ALLENDE                                            ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "ALLENDE                                 ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0028F     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO HUAY-PIX                                           ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "HUAY-PIX                                ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0029E     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO JUAN SARABIA                                       ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "JUAN SARABIA                            ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0030U     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO MOROCOY                                            ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "MOROCOY                                 ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0031T     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO TRES GARANTIAS                                     ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "TRES GARANTIAS                          ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0032S     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO AKUMAL                                             ",
      "Entidad_federativa": 23,
      "Municipio": "Tulum",
      "Colonia": "AKUMAL                                  ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0033R     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO CIUDAD CHEMUYIL                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Tulum",
      "Colonia": "CIUDAD CHEMUYIL                         ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0034Q     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO MARGARITA MAZA DE JUAREZ                           ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "MARGARITA MAZA DE JUAREZ                ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0035P     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO NUEVO VALLADOLID                                   ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "NUEVO VALLADOLID                        ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0036O     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO NUEVO BECAR                                        ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "NUEVO BECAR                             ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0037N     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO FELIPE ANGELES                                     ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "FELIPE ANGELES                          ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0038M     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO LA PANTERA                                         ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "LA PANTERA                              ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0039L     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO COLONIA AVANTE                                     ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0040A     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO COLONIA TRES REYES                                 ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0041Z     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO CHAN SANTA CRUZ                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "CHAN SANTA CRUZ                         ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0042Z     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO KAMPOKOLCHE                                        ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "KAMPOKOLCHE                             ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0043Y     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO KOPCHEN                                            ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "KOPCHEN                                 ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0044X     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO POLYUC                                             ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "POLYUC                                  ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0045W     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SANTA ROSA SEGUNDO                                 ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "SANTA ROSA SEGUNDO                      ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0046V     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO X YATIL                                            ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "X-YATIL                                 ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0047U     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO FRANCISCO MAY                                      ",
      "Entidad_federativa": 23,
      "Municipio": "Isla Mujeres",
      "Colonia": "FRANCISCO MAY                           ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0048T     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SERGIO BUTRON CASAS                                ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "SERGIO BUTRON CASAS                     ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0049S     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO LA UNION                                           ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "LA UNION                                ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0050H     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO JOSE NARCISO ROVIROSA                              ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "JOSE NARCISO ROVIROSA                   ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0051G     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO XCALAK                                             ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "XCALAK                                  ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0052F     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO FRANCISCO UH MAY                                   ",
      "Entidad_federativa": 23,
      "Municipio": "Tulum",
      "Colonia": "FRANCISCO UH MAY                        ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0053E     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO CHANCHEN PALMAR                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Tulum",
      "Colonia": "CHANCHEN PALMAR                         ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0054D     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO EL CEDRALITO                                       ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "EL CEDRALITO                            ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0055C     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO HUATUSCO                                           ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "HUATUSCO                                ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0056B     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO MANUEL AVILA CAMACHO                               ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "MANUEL AVILA CAMACHO                    ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0057A     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SAN ROMAN                                          ",
      "Entidad_federativa": 23,
      "Municipio": "Bacalar",
      "Colonia": "SAN ROMAN                               ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0058Z     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO IGNACIO MANUEL ALTAMIRANO                          ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "IGNACIO MANUEL ALTAMIRANO               ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0059Z     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO FILOMENO MATA                                      ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "FILOMENO MATA                           ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0060O     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO RAMONAL                                            ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "RAMONAL                                 ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0061N     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO TIXCACAL GUARDIA                                   ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "TIXCACAL GUARDIA                        ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0062M     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO TRAPICH                                            ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "TRAPICH                                 ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0063L     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO TUZIK                                              ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "TUZIK                                   ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0064K     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO YALCHEN                                            ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "YALCHEN                                 ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0065J     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO YAXLEY                                             ",
      "Entidad_federativa": 23,
      "Municipio": "Felipe Carrillo Puerto",
      "Colonia": "YAXLEY                                  ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0066I     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO ADOLFO LÓPEZ MATEOS                                ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "ADOLFO LÓPEZ MATEOS                     ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0067H     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO LA ESPERANZA                                       ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "LA ESPERANZA                            ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0068G     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO PLAN DE LA NORIA PONIENTE                          ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "PLAN DE LA NORIA PONIENTE               ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0069F     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SACALACA                                           ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "SACALACA                                ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0070V     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SAN DIEGO                                          ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "SAN DIEGO                               ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0071U     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SAN FELIPE PRIMERO                                 ",
      "Entidad_federativa": 23,
    "Municipio": "José María Morelos",
      "Colonia": "SAN FELIPE PRIMERO                      ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0072T     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO NUEVO XCAN                                         ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "NUEVO XCAN                              ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0073S     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SAN PEDRO                                          ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "SAN PEDRO                               ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0074R     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SOLFERINO                                          ",
      "Entidad_federativa": 23,
      "Municipio": "Lázaro Cárdenas",
      "Colonia": "SOLFERINO                               ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0075Q     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO CACAO                                              ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CACAO                                   ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0076P     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO FRANCISCO VILLA                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "FRANCISCO VILLA                         ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0077O     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO JESUS GONZALEZ ORTEGA                              ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "JESUS GONZALEZ ORTEGA                   ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0078N     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO RAMONAL                                            ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "RAMONAL                                 ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23ETK0079M     ",
      "Nombre": "TELEBACHILLERATO COMUNITARIO SAN JUAN                                           ",
      "Entidad_federativa": 23,
      "Municipio": "Tulum",
      "Colonia": "SAN JUAN                                ",
      "Servicio": "TELEBACHILLERATO                                                                ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23OTRA         ",
      "Nombre": "OTRA NO INCLUIDA EN ESTE CATALOGO                                               ",
      "Entidad_federativa": 23,
      "Municipio": "OTRO                          ",
      "Colonia": "NULL                                    ",
      "Servicio": "NULL                                                                            ",
      "Sostenimiento": "                                                                                "
    },
    {
      "Clave": "23PBH0003Z     ",
      "Nombre": "COLEGIO KUKULCAN CANCUN, S.C.                                                   ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0005Y     ",
      "Nombre": "COLEGIO ECAB                                                                    ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0007W     ",
      "Nombre": "IGNACIO LÓPEZ RAYON                                                             ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0008V     ",
      "Nombre": "INSTITUTO PARTENON DE COZUMEL, A.C.                                             ",
      "Entidad_federativa": 23,
    "Municipio": "Cozumel",
      "Colonia": "COZUMEL                                 ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0009U     ",
      "Nombre": "CENTRO EDUCATIVO ITZAMNA                                                        ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0010J     ",
      "Nombre": "CAMPO ESCUELA SAN JOSE                                                          ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0013G     ",
      "Nombre": "COLEGIO IGNACIO COMONFORT                                                       ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0015E     ",
      "Nombre": "INSTITUTO AMERICANO LEONARDO DA VINCI                                           ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0018B     ",
      "Nombre": "COLEGIO INTERNACIONAL AMERICANO DE CANCUN, A.C.                                 ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "ALFREDO V. BONFIL                       ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0019A     ",
      "Nombre": "ICARO                                                                           ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0020Q     ",
      "Nombre": "PREPARATORIA LA SALLE PLAYA DEL CARMEN                                          ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0023N     ",
      "Nombre": "BOSTON                                                                          ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0024M     ",
      "Nombre": "COLEGIO INGLES                                                                  ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0026K     ",
      "Nombre": "COLEGIO UNIVERSITARIO ANGLO MEXICANO, S.C. (CUAM)                               ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0027J     ",
      "Nombre": "COLEGIO PUERTO AVENTURAS                                                        ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PUERTO AVENTURAS                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0028I     ",
      "Nombre": "CENTRO EDUCATIVO MERIDA                                                         ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0029H     ",
      "Nombre": "COLEGIO LIZARDI                                                                 ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0030X     ",
      "Nombre": "BACHILLERATO UNID                                                               ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0031W     ",
      "Nombre": "COLEGIO DEL CARIBE                                                              ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0033U     ",
      "Nombre": "BENITO JUAREZ GARCIA                                                            ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0034T     ",
      "Nombre": "PREPARATORIA CANCUN                                                             ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0035S     ",
      "Nombre": "INSTITUTO CESARE                                                                ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0036R     ",
      "Nombre": "COLEGIO MAYALAND                                                                ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0037Q     ",
      "Nombre": "ESCUELA DEL SINDICALISMO NUEVO                                                  ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0038P     ",
      "Nombre": "ESCUELA PREPARATORIA ANDRES QUINTANA ROO                                        ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0039O     ",
      "Nombre": "INSTITUTO TEPEYAC CAMPUS XCARET                                                 ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0040D     ",
      "Nombre": "PREPARATORIA RIVIERA                                                            ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0041C     ",
      "Nombre": "BACHILLERATO NACIONES UNIDAS                                                    ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0042B     ",
      "Nombre": "COLEGIO ALAMOS                                                                  ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0043A     ",
      "Nombre": "COLEGIO REAL DEL CARIBE                                                         ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "ALFREDO V. BONFIL                       ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0044Z     ",
      "Nombre": "COLEGIO MANO AMIGA CANCUN                                                       ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "ALFREDO V. BONFIL                       ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0045Z     ",
      "Nombre": "CENTRO EDUCATIVO MAHATMA GANDHI                                                 ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0046Y     ",
      "Nombre": "BACHILLERATO SUMMERHILL                                                         ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0047X     ",
      "Nombre": "COLEGIO MIRAMAR                                                                 ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0048W     ",
      "Nombre": "CENTRO DE ESTUDIOS TRILINGUE IN NAJIL XOOK TULUM                                ",
      "Entidad_federativa": 23,
      "Municipio": "Tulum",
      "Colonia": "TULUM                                   ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0049V     ",
      "Nombre": "COLEGIO LATINO                                                                  ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0050K     ",
      "Nombre": "CENTRO EDUCATIVO INTERCULTURAL DEL CARIBE                                       ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0051J     ",
      "Nombre": "INSTITUTO XEL-BAALAM                                                            ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0052I     ",
      "Nombre": "INSTITUTO VITTORIO MONTEVERDI                                                   ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0053H     ",
      "Nombre": "PREPARATORIA MONTEVERDE                                                         ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0054G     ",
      "Nombre": "INSTITUTO BACAB                                                                 ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0055F     ",
      "Nombre": "INSTITUTO LAMAT                                                                 ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0056E     ",
      "Nombre": "PREPARATORIA ESCUELA MODELO                                                     ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0057D     ",
      "Nombre": "COLEGIO REDMOND                                                                 ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0058C     ",
      "Nombre": "INSTITUTO SMIC                                                                  ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0060R     ",
      "Nombre": "PREPARATORIA ON LINE CETEC                                                      ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0061Q     ",
      "Nombre": "INSTITUTO VANGUARDIA EDUCATIVA",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0062P     ",
      "Nombre": "PREPARATORIA GARDNER                                                            ",
      "Entidad_federativa": 23,
    "Municipio": "Cozumel",
      "Colonia": "COZUMEL                                 ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0063O     ",
      "Nombre": "BRITT ACADEMY                                                                   ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0064N     ",
      "Nombre": "E-SCUELA EDUCACIÓN EN LINEA                                                     ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0065M     ",
      "Nombre": "AGHARTA                                                                         ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0066L     ",
      "Nombre": "BACHILLERATO EN LINEA DE LA UNIVERSIDAD DE DESARROLLO PROFESIONAL               ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH0067K     ",
      "Nombre": "INSTITUTO LAMAT PLAYA DEL CARMEN                                                ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH3101V     ",
      "Nombre": "UNIVERSIDAD ANAHUAC BACHILLERATO CUMBRES COZUMEL                                ",
      "Entidad_federativa": 23,
    "Municipio": "Cozumel",
      "Colonia": "COZUMEL                                 ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH3116X     ",
      "Nombre": "UNIVERSIDAD ANAHUAC BACHILLERATO CUMBRES DE QUINTANA ROO                        ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH3135L     ",
      "Nombre": "UNIVERSIDAD LA SALLE CANCUN                                                     ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH3388O     ",
      "Nombre": "INSTITUTO DEL CARIBE                                                            ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH3686N     ",
      "Nombre": "UNIVERSIDAD TEC MILENIO CANCUN                                                  ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH3703N     ",
      "Nombre": "PREPARATORIA AZTECA DEL CARIBE                                                  ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH3838B     ",
      "Nombre": "BACHILLERATO UVG CAMPUS CANCUN                                                  ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH3890Y     ",
      "Nombre": "BACHILLERATO NATKAN                                                             ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PBH3970J     ",
      "Nombre": "INSTITUTO PREUNIVERSITARIO DEL CENTRO DE MEXICO CAMPUS CANCUN                   ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PCB0001G     ",
      "Nombre": "COLEGIO BRITANICO DEL CARIBE, S.C.                                              ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PCB0003E     ",
      "Nombre": "LICEO DEL CARIBE                                                                ",
      "Entidad_federativa": 23,
      "Municipio": "Isla Mujeres",
      "Colonia": "ISLA MUJERES                            ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PCT0003U     ",
      "Nombre": "JOSE MARTI                                                                      ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PCT0004T     ",
      "Nombre": "BACHILLERATO TECNOLÓGICO DE LA ESCUELA DE PUERICULTURA DEL SURESTE CAMPUS CANCUN",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PCT0005S     ",
      "Nombre": "JAIME TORRES BODET                                                              ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PCT0006R     ",
      "Nombre": "ESCUELA DE PUERICULTURA DEL SURESTE MANUEL ACEVEDO RUIZ DEL HOYO                ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PCT0007Q     ",
      "Nombre": "INSTITUTO PARTENON PREPARATORIA                                                 ",
      "Entidad_federativa": 23,
      "Municipio": "Othón P. Blanco",
      "Colonia": "CHETUMAL                                ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PCT0008P     ",
      "Nombre": "CENTRO UNIVERSITARIO PENINSULAR                                                 ",
      "Entidad_federativa": 23,
    "Municipio": "Benito Juárez",
      "Colonia": "CANCUN",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23PCT0009O     ",
      "Nombre": "BACHILLERATO TECNOLÓGICO DE LA ESCUELA TÉCNICA MEDIA SUPERIOR DZALAM            ",
      "Entidad_federativa": 23,
      "Municipio": "Solidaridad",
      "Colonia": "PLAYA DEL CARMEN                        ",
      "Servicio": "PARTICULAR                                                                      ",
      "Sostenimiento": "SEQROO                                                                          "
    },
    {
      "Clave": "23XCM0002U     ",
      "Nombre": "EXTENSION DEL CENTRO DE ESTUDIOS TECNOLÓGICOS DEL MAR NÚM. 10                   ",
      "Entidad_federativa": 23,
      "Municipio": "Puerto Morelos",
      "Colonia": "PUERTO MORELOS                          ",
      "Servicio": "CETMAR                                                                          ",
      "Sostenimiento": "SEQROO                                                                          "
    }
];
estadoCivil=["Soltero","Casado","Divorciado","Viudo","Unión Libre"];

codigosOtho=[{"id":105358,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77000","asentamiento":"Chetumal Centro","tipo":"Colonia"},{"id":105359,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77008","asentamiento":"Secretaria de Hacienda y Crédito Publico","tipo":"Gran usuario"},{"id":105360,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77009","asentamiento":"Palacio de Gobierno del Estado de Quintana Roo","tipo":"Gran usuario"},{"id":105361,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77010","asentamiento":"Naval","tipo":"Colonia"},{"id":105362,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco",
"ciudad":"Chetumal","zona":"Urbano","cp":"77010","asentamiento":"Adolfo López Mateos","tipo":"Colonia"},{"id":105363,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77010","asentamiento":"Francisco J Mújica INFONAVIT","tipo":"Unidad habitacional"},{"id":105364,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77010","asentamiento":"Isabel Tenorio","tipo":"Colonia"},{"id":105365,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77010","asentamiento":"Bugambilias","tipo":"Fraccionamiento"},{"id":105366,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77010","asentamiento":"Del Mar I y II (Infonavit)","tipo":"Fraccionamiento"},{"id":105367,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77011","asentamiento":"Centro Sct Quintana Roo","tipo":"Gran usuario"},{"id":105368,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77012","asentamiento":"Venustiano Carranza","tipo":"Colonia"},{"id":105369,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77012","asentamiento":"Casitas","tipo":"Colonia"},{"id":105370,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77013","asentamiento":"David G Gutiérrez Ruiz","tipo":"Colonia"},{"id":105371,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77014","asentamiento":"Villas Kinichna","tipo":"Fraccionamiento"},{"id":105372,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77014","asentamiento":"Centenario","tipo":"Fraccionamiento"},{"id":105373,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77014","asentamiento":"Andara","tipo":"Fraccionamiento"},{"id":105374,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77014","asentamiento":"Infonavit Santa María","tipo":"Unidad habitacional"},{"id":105375,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77014","asentamiento":"Oxtankah","tipo":"Fraccionamiento"},{"id":105376,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77014","asentamiento":"Unidad Antorchista","tipo":"Colonia"},{"id":105377,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77014","asentamiento":"Los Arcos","tipo":"Fraccionamiento"},{"id":105378,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77014","asentamiento":"Pacto Obrero Campesino","tipo":"Fraccionamiento"},{"id":105379,"idEstado":"23",
"estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77015","asentamiento":"Constituyentes","tipo":"Colonia"},{"id":105380,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Rural","cp":"77015","asentamiento":"Industrial","tipo":"Colonia"},{"id":105381,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77015","asentamiento":"Del Sol","tipo":"Fraccionamiento"},{"id":105382,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77016","asentamiento":"Leona Vicario","tipo":"Colonia"},{"id":105383,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77016","asentamiento":"Martínez Ross","tipo":"Colonia"},{"id":105384,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77017","asentamiento":"Ley Federal de Agua","tipo":"Colonia"},{"id":105385,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77017","asentamiento":"SAHOP","tipo":"Colonia"},{"id":105386,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77018","asentamiento":"5 de Abril","tipo":"Colonia"},{"id":105387,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77018","asentamiento":"Avancemos Juntos","tipo":"Colonia"},{"id":105388,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77018","asentamiento":"Reforma","tipo":"Fraccionamiento"},{"id":105389,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77019","asentamiento":"Del Bosque","tipo":"Colonia"},{"id":105390,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77020","asentamiento":"Carlos Riva Palacio","tipo":"Colonia"},{"id":105391,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77020","asentamiento":"Rafael E Melgar FOVISSSTE","tipo":"Unidad habitacional"},{"id":105392,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77020","asentamiento":"Gonzalo Guerrero","tipo":"Colonia"},{"id":105393,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77023","asentamiento":"Infonavit Enrique Ramírez y Ramírez","tipo":"Unidad habitacional"},{"id":105394,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77023","asentamiento":"Miraflores II","tipo":"Fraccionamiento"},{"id":105395,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77024","asentamiento":"Cedros","tipo":"Fraccionamiento"},{"id":105396,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77024","asentamiento":"Fovissste (II Etapa)","tipo":"Colonia"},{"id":105397,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77025","asentamiento":"Sutage INFONAVIT","tipo":"Fraccionamiento"},{"id":105398,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77025","asentamiento":"Forjadores de Quintana Roo","tipo":"Colonia"},{"id":105399,"idEstado":"23",
"estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77025","asentamiento":"Los Almendros","tipo":"Fraccionamiento"},{"id":105400,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77025","asentamiento":"Residencial Marsella","tipo":"Fraccionamiento"},{"id":105401,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77025","asentamiento":"Guadalupe Victoria","tipo":"Colonia"},{"id":105402,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77025","asentamiento":"Milenio","tipo":"Fraccionamiento"},{"id":105403,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77026","asentamiento":"El Sol","tipo":"Fraccionamiento"},{"id":105404,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77026","asentamiento":"Tumben Cuxtal","tipo":"Fraccionamiento"},{"id":105405,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77026","asentamiento":"Fovissste IV Etapa","tipo":"Fraccionamiento"},{"id":105406,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77026","asentamiento":"Jardines","tipo":"Colonia"},{"id":105407,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77027","asentamiento":"Miraflores","tipo":"Colonia"},{"id":105408,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77028","asentamiento":"8 de Octubre","tipo":"Colonia"},{"id":105409,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77028","asentamiento":"Plutarco Elías Calles","tipo":"Fraccionamiento"},{"id":105410,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77028","asentamiento":"8 de Octubre","tipo":"Ampliación"},{"id":105411,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77029","asentamiento":"Bosques del Lago","tipo":"Fraccionamiento"},{"id":105412,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77029","asentamiento":"Los Monos","tipo":"Fraccionamiento"},{"id":105413,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77029","asentamiento":"Lagunitas","tipo":"Colonia"},{"id":105414,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77030","asentamiento":"Campestre","tipo":"Fraccionamiento"},{"id":105415,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77034","asentamiento":"Framboyanes","tipo":"Colonia"},{"id":105416,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77035","asentamiento":"Italia","tipo":"Colonia"},{"id":105417,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77036","asentamiento":"Josefa Ortiz de Domínguez","tipo":"Colonia"},{"id":105418,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77037","asentamiento":"Aserradero","tipo":"Colonia"},{"id":105419,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77037","asentamiento":"Taxistas","tipo":"Colonia"},{"id":105420,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77037","asentamiento":"Benito Juárez","tipo":"Colonia"},{"id":105421,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77038","asentamiento":"20 de Noviembre","tipo":"Colonia"},{"id":105422,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77039","asentamiento":"Magisterial","tipo":"Colonia"},{"id":105423,"idEstado":"23",
"estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77039","asentamiento":"Residencial Mediterráneo","tipo":"Fraccionamiento"},{"id":105424,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77040","asentamiento":"Santa Isabel Cereso","tipo":"Colonia"},{"id":105425,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77041","asentamiento":"Cereso Chetumal","tipo":"Gran usuario"},{"id":105426,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77048","asentamiento":"Chetumal (Internacional de Chetumal)","tipo":"Aeropuerto"},{"id":105427,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77049","asentamiento":"FOVISSSTE 5a Etapa","tipo":"Unidad habitacional"},{"id":105428,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77049","asentamiento":"Estatuto Jurídico","tipo":"Colonia"},{"id":105429,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77050","asentamiento":"Infonavit Álvaro Obregón","tipo":"Unidad habitacional"},{"id":105430,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77050","asentamiento":"Aeropuerto","tipo":"Fraccionamiento"},{"id":105431,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77050","asentamiento":"Fovissste (I Etapa)","tipo":"Colonia"},{"id":105432,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77050","asentamiento":"Cascadas II","tipo":"Fraccionamiento"},{"id":105433,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77050","asentamiento":"Infonavit Hermanos Flores Magón","tipo":"Colonia"},{"id":105434,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77050","asentamiento":"Cascada I","tipo":"Fraccionamiento"},{"id":105435,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77050","asentamiento":"Residencial la Herradura","tipo":"Residencial"},{"id":105436,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77053","asentamiento":"Lomas del Caribe","tipo":"Fraccionamiento"},{"id":105437,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77059","asentamiento":"Infonavit Villas Chetumal","tipo":"Unidad habitacional"},{"id":105438,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77060","asentamiento":"Militar","tipo":"Colonia"},{"id":105439,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77060","asentamiento":"Electricistas","tipo":"Colonia"},{"id":105440,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77070","asentamiento":"Infonavit Aarón Merino Fernández","tipo":"Unidad habitacional"},{"id":105441,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77079","asentamiento":"FOVISSSTE 6a Etapa","tipo":"Unidad habitacional"},{"id":105442,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77079","asentamiento":"Fovissste VI Etapa (Tampico)","tipo":"Fraccionamiento"},{"id":105443,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77079","asentamiento":"Las Brisas","tipo":"Fraccionamiento"},{"id":105444,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77079","asentamiento":"Bahía","tipo":"Fraccionamiento"},{"id":105445,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77079","asentamiento":"Zona de Granjas","tipo":"Colonia"},{"id":105446,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal",
"zona":"Urbano","cp":"77079","asentamiento":"Residencial Caribe","tipo":"Fraccionamiento"},{"id":105447,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77080","asentamiento":"Infonavit Fidel Velázquez","tipo":"Unidad habitacional"},{"id":105448,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77082","asentamiento":"Kilómetro 5","tipo":"Fraccionamiento"},{"id":105449,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77082","asentamiento":"Jardines de Payo Obispo","tipo":"Colonia"},{"id":105450,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77083","asentamiento":"Nuevo Progreso","tipo":"Colonia"},{"id":105451,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77083","asentamiento":"Payo Obispo I y II","tipo":"Colonia"},{"id":105452,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77083","asentamiento":"Payo Obispo IV","tipo":"Colonia"},{"id":105453,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77083","asentamiento":"Tamalcab","tipo":"Colonia"},{"id":105454,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77083","asentamiento":"Residencial Chetumal IV","tipo":"Residencial"},{"id":105455,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77084","asentamiento":"Maya Real","tipo":"Fraccionamiento"},{"id":105456,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77084","asentamiento":"Infonavit Emancipación","tipo":"Unidad habitacional"},{"id":105457,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77084","asentamiento":"Payo Obispo","tipo":"Fraccionamiento"},{"id":105458,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77085","asentamiento":"Hacienda Chetumal","tipo":"Fraccionamiento"},{"id":105459,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"El Encanto","tipo":"Conjunto habitacional"},{"id":105460,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Lázaro Cárdenas","tipo":"Colonia"},{"id":105461,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Las Américas","tipo":"Fraccionamiento"},{"id":105462,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Las Americas II","tipo":"Fraccionamiento"},{"id":105463,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Residencial del Sol","tipo":"Fraccionamiento"},{"id":105464,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Solidaridad","tipo":"Unidad habitacional"},{"id":105465,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77086","asentamiento":"Comité Proterritorio","tipo":"Colonia"},{"id":105466,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Caribe","tipo":"Colonia"},{"id":105467,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Las Arboledas II","tipo":"Fraccionamiento"},{"id":105468,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Territorio Federal de Quintana Roo","tipo":"Colonia"},{"id":105469,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Infonavit 17 de Octubre","tipo":"Unidad habitacional"},{"id":105470,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Andrés Quintana Roo","tipo":"Colonia"},{"id":105471,"idEstado":"23","estado":"Quintana Roo",
"idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Residencial Chetumal I y II (2004)","tipo":"Fraccionamiento"},{"id":105472,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Nueva Generación","tipo":"Fraccionamiento"},{"id":105473,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Proterritorio VII","tipo":"Fraccionamiento"},{"id":105474,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"La Esperanza","tipo":"Fraccionamiento"},{"id":105475,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Sian Kaan II","tipo":"Fraccionamiento"},{"id":105476,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Las Arboledas I","tipo":"Fraccionamiento"},{"id":105477,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Residencial Arboledas","tipo":"Residencial"},{"id":105478,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Félix Gonzalez Canto","tipo":"Fraccionamiento"},{"id":105479,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77086","asentamiento":"Proterritorio Ampliación I","tipo":"Colonia"},{"id":105480,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Las Américas III","tipo":"Colonia"},{"id":105481,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Bicentenario","tipo":"Fraccionamiento"},{"id":105482,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77086","asentamiento":"Proterritorio VIII","tipo":"Fraccionamiento"},{"id":105483,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77087","asentamiento":"Sian Kaan","tipo":"Fraccionamiento"},{"id":105484,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77090","asentamiento":"Plutarco Elías Calles","tipo":"Colonia"},{"id":105485,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Semiurbano","cp":"77098","asentamiento":"Barrio Bravo","tipo":"Barrio"},{"id":105486,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"Chetumal","zona":"Urbano","cp":"77099","asentamiento":"Primera Legislatura","tipo":"Colonia"},{"id":106487,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77950","asentamiento":"Prof. Sergio Butrón Casas","tipo":"Pueblo"},{"id":106488,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77953","asentamiento":"Los Lirios","tipo":"Ranchería"},{"id":106489,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77953","asentamiento":"Jesús González Ortega","tipo":"Pueblo"},{"id":106490,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77953","asentamiento":"Morocoy","tipo":"Ranchería"},{"id":106491,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Urbano","cp":"77954","asentamiento":"Cedro","tipo":"Colonia"},{"id":106492,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Urbano","cp":"77954","asentamiento":"10 de Septiembre","tipo":"Colonia"},{"id":106493,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Urbano","cp":"77954","asentamiento":"16 de Septiembre","tipo":"Colonia"},{"id":106494,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77954","asentamiento":"Lázaro Cárdenas del Río","tipo":"Ranchería"},{"id":106495,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Urbano","cp":"77954","asentamiento":"20 de Noviembre","tipo":"Colonia"},{"id":106496,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77955",
"asentamiento":"California","tipo":"Rancho"},{"id":106497,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77955","asentamiento":"Nuevo Caanán","tipo":"Pueblo"},{"id":106498,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77955","asentamiento":"El Cedral","tipo":"Ranchería"},{"id":106499,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77957","asentamiento":"Limonar","tipo":"Ejido"},{"id":106500,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77957","asentamiento":"La Libertad","tipo":"Ranchería"},{"id":106501,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77957","asentamiento":"Lázaro Cárdenas NCPE","tipo":"Ranchería"},{"id":106502,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77957","asentamiento":"SanPedro Peralta","tipo":"Ranchería"},{"id":106503,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77959","asentamiento":"Emiliano Zapata","tipo":"Ranchería"},{"id":106504,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Urbano","cp":"77960","asentamiento":"La Conquista","tipo":"Fraccionamiento"},{"id":106505,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Urbano","cp":"77960","asentamiento":"16 de Septiembre","tipo":"Colonia"},{"id":106506,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Urbano","cp":"77960","asentamiento":"Yucatán","tipo":"Colonia"},{"id":106507,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Urbano","cp":"77960","asentamiento":"Veracruz","tipo":"Colonia"},{"id":106508,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Urbano","cp":"77960","asentamiento":"Centro Calderitas","tipo":"Colonia"},{"id":106509,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Urbano","cp":"77960","asentamiento":"Lázaro Cárdenas","tipo":"Colonia"},{"id":106510,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77962","asentamiento":"Jesús Martínez Ross","tipo":"Ranchería"},{"id":106511,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77963","asentamiento":"Xul-ha","tipo":"Pueblo"},{"id":106512,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77965","asentamiento":"Huaypix","tipo":"Ranchería"},{"id":106513,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77965","asentamiento":"Juan Sarabia","tipo":"Pueblo"},{"id":106514,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77965","asentamiento":"Subteniente López","tipo":"Pueblo"},{"id":106515,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77966","asentamiento":"Luis Echeverría","tipo":"Pueblo"},{"id":106516,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77966","asentamiento":"Raudales","tipo":"Ranchería"},{"id":106517,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77966","asentamiento":"Laguna Guerrero","tipo":"Ranchería"},{"id":106518,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77970","asentamiento":"Xcalak","tipo":"Ranchería"},{"id":106519,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77973","asentamiento":"Pioneros del Río Xnohá","tipo":"Ranchería"},{"id":106520,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77976","asentamiento":"Mahahual","tipo":"Pueblo"},{"id":106521,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77977","asentamiento":"Playa Uvero","tipo":"Rancho"},{"id":106522,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77980","asentamiento":"Javier Rojo Gómez","tipo":"Pueblo"},{"id":106523,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77980","asentamiento":"Álvaro Obregón 1","tipo":"Ranchería"},
{"id":106524,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77983","asentamiento":"Sabidos","tipo":"Pueblo"},{"id":106525,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77983","asentamiento":"Ingenio Álvaro Obregón","tipo":"Pueblo"},{"id":106526,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77983","asentamiento":"Francisco Villa","tipo":"Pueblo"},{"id":106527,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77984","asentamiento":"San Antonio Soda","tipo":"Ranchería"},{"id":106528,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77984","asentamiento":"10 de Septiembre","tipo":"Colonia"},{"id":106529,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77984","asentamiento":"Cacao","tipo":"Pueblo"},{"id":106530,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77984","asentamiento":"Pucte","tipo":"Pueblo"},{"id":106531,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77984","asentamiento":"Nicolás Bravo","tipo":"Ranchería"},{"id":106532,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77984","asentamiento":"Hidalgo","tipo":"Ejido"},{"id":106533,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77984","asentamiento":"Pedro Joaquín Coldwell","tipo":"Pueblo"},{"id":106534,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77985","asentamiento":"Ramonal","tipo":"Pueblo"},{"id":106535,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77985","asentamiento":"Carlos A Madrazo","tipo":"Pueblo"},{"id":106536,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77985","asentamiento":"Allende","tipo":"Pueblo"},{"id":106537,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77985","asentamiento":"Ucum","tipo":"Ranchería"},{"id":106538,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77985","asentamiento":"Palmar","tipo":"Pueblo"},{"id":106539,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77985","asentamiento":"Nachi-cocom","tipo":"Ranchería"},{"id":106540,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77986","asentamiento":"San José de la Montaña","tipo":"Pueblo"},{"id":106541,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77987","asentamiento":"El Cedralito","tipo":"Ranchería"},{"id":106542,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77987","asentamiento":"Caobas","tipo":"Pueblo"},{"id":106543,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77990","asentamiento":"Ing. José Narciso Rovirosa","tipo":"Ranchería"},{"id":106544,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77990","asentamiento":"Cocoyol","tipo":"Pueblo"},{"id":106545,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77992","asentamiento":"Calderón","tipo":"Ejido"},{"id":106546,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77992","asentamiento":"Revolución","tipo":"Rancho"},{"id":106547,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77992","asentamiento":"La Unión","tipo":"Pueblo"},{"id":106548,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77994","asentamiento":"Tomás Garrido","tipo":"Ranchería"},{"id":106549,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77995","asentamiento":"2 Aguadas","tipo":"Ranchería"},{"id":106550,"idEstado":"23","estado":"Quintana Roo","idMunicipio":"4","municipio":"Othón P. Blanco","ciudad":"","zona":"Rural","cp":"77997","asentamiento":"3 Garantías","tipo":"Pueblo"}]



enviar(){

  console.log(this.formGeneral)

  this.api.envioDatos(this.formGeneral)
  this.router.navigate(['/socioeconomico/'+this.formGeneral.nip]);

}


async getData() {
  const loading = await this.loadingController.create({
    message: 'Loading'
  });
  await loading.present();
    
      loading.dismiss();
    
}

ngOnInit() {    this.getData();
}
  
}
