import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listFilms = [];
  public aux = 'hola';
  public nameUser = '';
  public titleFilm = '';

  constructor(
    public firebaseX: FirebaseX,
    public homeService: HomeService,
    private firestore: AngularFirestore,
    private router: Router,
    private activatedRoute: ActivatedRoute ) 
  {
    this.mostrarHome();
  }

  async mostrarHome(){
    let count = 0;

    this.nameUser = this.activatedRoute.snapshot.paramMap.get('name');
    console.log(this.nameUser);

    let consultFirestore = this.firestore.collection('Peliculas');
    console.log(consultFirestore);
    let consultData: number;

    await consultFirestore.get().subscribe((res) => {
      console.log(res.docs);
      consultData = res.docs.length;
      console.log(consultData);

      if (consultData == 0) {
        console.log('No hay datos en la BD -> ', consultData);
        this.homeService.getFilms().subscribe((response) => {
          response['results'].forEach((element) => {
            let newFilm = {
              id: count,
              title: element['title'],
              desc: element['opening_crawl'],
              dir: element['director'],
              date: element['release_date'],
            };

            // Subimos datos a firebase.
            let subirDato = this.firestore.doc('Peliculas/' + newFilm.id);
            subirDato.set({
              id: newFilm.id,
              title: newFilm.title,
              desc: newFilm.desc,
              dir: newFilm.dir,
              date: newFilm.date,
            });

            count++;

            this.listFilms.push(newFilm);
            console.log(this.listFilms);
          });

          console.log(this.listFilms);
        });

        console.log('this.listFilms');
      } else {
        console.log('hay datos en la BD -> ', consultData);

        // TODO no me acaba de gustar esta forma, y si por algún motivo las ids van de la 0-7 pero la id=3 no existe? esto no sería funcional...
        for (var i = 0; i < consultData; i++) {
          let consultFirestoreDoc = this.firestore.doc('Peliculas/' + i);
          //console.log(consultFirestoreDoc);
          consultFirestoreDoc.get().subscribe((resSubs) => {
            console.log(resSubs.data());
            let newFilm = {
              id: resSubs.data()['id'],
              title: resSubs.data()['title'],
              desc: resSubs.data()['desc'],
              dir: resSubs.data()['dir'],
              date: resSubs.data()['date'],
            };

            this.listFilms.push(newFilm);
            console.log(this.listFilms);
          });
        }
      }
    });
  }
  goToDetails(id) {
    console.log(id);
    this.router.navigate(['/details/' + id + '/' + this.nameUser]);
  }

  addFilm(){
    this.router.navigate(['/details/', this.nameUser]);
  }
}
