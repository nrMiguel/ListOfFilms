import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Esto es para uso de API Externa

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';


const firebaseConfig = {
  apiKey: "AIzaSyBVzxlZLctL2D95tupVCsLbZcZrGKkRWRo",
  authDomain: "uf1-pr01-miguelnunezramon1.firebaseapp.com",
  projectId: "uf1-pr01-miguelnunezramon1",
  storageBucket: "uf1-pr01-miguelnunezramon1.appspot.com",
  messagingSenderId: "891369373241",
  appId: "1:891369373241:web:4755e7f4995ddece9817e8",
  measurementId: "G-FLVV6DHPDE"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: 
  [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, 
    AngularFireStorageModule, 
    AngularFirestoreModule, 
    AngularFireDatabaseModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, FirebaseX],
  bootstrap: [AppComponent],
})
export class AppModule {}
