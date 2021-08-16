import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { fruits } from './fruits-list';

@Component({
  selector: 'ngx-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent implements OnInit {

  textoBuscar= '';
  Peticiones:any = [];
  constructor(  
    public newsService: NewsService) 
    {}

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
      getsearchPqr(query: string) {
    
        this.newsService.getUserDoc("a")
        .subscribe(res => {
    
          console.log(res);
          
        });}  

      search(event: any){
        this.textoBuscar = event.target.value;
        //this.getsearchPqr("a");

      }


}
