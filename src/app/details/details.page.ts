import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  titulo = '';
  desc = '';
  director = '';
  fecha = '';
  nameUser = 'nada';
  id;

  constructor(
    public firebaseX: FirebaseX,
    private firestore: AngularFirestore,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);

    this.nameUser = this.activatedRoute.snapshot.paramMap.get('nameUser');

    if (this.id != null) {
      let consultFirestoreDoc = this.firestore.doc('Peliculas/' + this.id);
      //console.log(consultFirestoreDoc);
      consultFirestoreDoc.get().subscribe((resSubs) => {
        console.log(resSubs.data());
        this.titulo = resSubs.data()['title'];
        this.desc = resSubs.data()['desc'];
        this.director = resSubs.data()['dir'];
        this.fecha = resSubs.data()['date'];

        //console.log(this.listFilms);
      });
    }
  }

  update() {
    if (this.id == null) {
      let consultFirestore = this.firestore.collection('Peliculas');
      console.log(consultFirestore);
      let consultData: number;

      consultFirestore.get().subscribe((res) => {
        console.log(res.docs);
        consultData = res.docs.length;
        console.log(consultData);

        let subirDato = this.firestore.doc('Peliculas/' + consultData);
        subirDato.set({
          id: consultData,
          title: this.titulo,
          desc: this.desc,
          dir: this.director,
          date: this.fecha,
        });

        this.router.navigate(['/home/', this.nameUser]);
      });
    } else {
      let subirDato = this.firestore.doc('Peliculas/' + this.id);
      subirDato.set({
        id: this.id,
        title: this.titulo,
        desc: this.desc,
        dir: this.director,
        date: this.fecha,
      });

      this.router.navigate(['/home/', this.nameUser]);
    }
  }

  cancel(){
    this.router.navigate(['/home/', this.nameUser]);
  }
  ngOnInit() {}
}
