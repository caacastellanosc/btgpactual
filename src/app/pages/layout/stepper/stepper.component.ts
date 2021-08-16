import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { NbDateService, NbToastrService } from '@nebular/theme';
import { NewsService } from '../news.service';
import * as uuid from 'uuid';


@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };
  Peticiones:any = [];
  min: Date;
  max: Date;
  peticion = [];
  peticiones ;
  myId:any ;
  selectedLevel;
  selectedPeticion: string = '';
  atendida:string = '';

  

  constructor(  private fb: FormBuilder,
                private service: SmartTableData,
                public newsService: NewsService,
                private toastr: NbToastrService,
                protected dateService: NbDateService<Date>) {
                  this.min = this.dateService.addDay(this.dateService.today(), -5);
                  this.max = this.dateService.addDay(this.dateService.today(), 5);
                  const data = this.service.getData();
                  this.source.load(data);
  }


  ngOnInit() {
this.inicialize();
  }

  inicialize() {
    this.getPeticiones();
  }

  getPeticiones() {
    
    this.newsService.getPeticiones()
    .subscribe(res => {
      this.Peticiones = res
      console.log(res);
      
    });}
    

  randomRespuestas():boolean {
    let aleatorio = Math.round(Math.random()*10);
    if(aleatorio<=1){
      return true;
    }  
    return false;
  }   

  randomtextrespuestas(flag: string){
    let respuesta= "";
    if(flag==="SI"){
      return respuesta = "No se le solucionara la peticion al usuario"
    }else{
      return respuesta = "sin respuesta"
    }
  }

  selectChangeHandler (event: any) {
      this.selectedPeticion = event.target.value;
  }
  selectChangeResponses(event: any){

    this.atendida = event.target.value;
  }

  onSubmit(){
    let data = this.newsService.form.value;
    let respuesta= "";
    this.myId = uuid.v4();
    console.log(data);
    if(this.selectedPeticion == "" || this.selectedPeticion== undefined){
      this.selectedPeticion = "Peticion"
    }
    if(this.atendida == "" || this.atendida== undefined){
      this.atendida = "SI"
    }

    respuesta = this.randomtextrespuestas(this.atendida);
    
    data = {id:this.myId,...data,tipopqr:this.selectedPeticion,respuestasAdmin:respuesta};
    console.log(data);

    
    
    this.newsService.createPeticion(data)
         .then(res => {

         });

     this.newsService.form.reset();    
    
  }

  
}
