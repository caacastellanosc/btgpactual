import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

const TOTAL_PAGES = 7;

export class NewsPost {
  title: string;
  link: string;
  creator: string;
  text: string;
}

@Injectable({
  providedIn: "root"
})
export class NewsService {

  constructor(private http: HttpClient,private firestore: AngularFirestore) {}

  form = new FormGroup({
    customerName: new FormControl(""),
    date: new FormControl(""),
    descripcion: new FormControl("")
  });

  load(page: number, pageSize: number): Observable<NewsPost[]> {
    const startIndex = ((page - 1) % TOTAL_PAGES) * pageSize;

    return this.http
      .get<NewsPost[]>('assets/data/news.json')
      .pipe(
        map(news => news.splice(startIndex, pageSize)),
        delay(1500),
      );
  }

  createPeticion(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("pqr")
            .add(data)
            .then(res => {

            }, err => reject(err));
    });
}

getPeticiones() {
  return this.firestore.collection("pqr").valueChanges();
}

getUserDoc(id) {
  return this.firestore
  .collection('pqr')
  .doc(id)
  .valueChanges()
}


}
