import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public email='';
  public password='';

  constructor(public fireAuth: AngularFireAuth, public router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  public signup(){
    this.fireAuth.createUserWithEmailAndPassword(this.email, this.password).then(res => {
      this.toastAfterSignup();
      this.router.navigate(['/login']);
    }).catch(error => {
      this.toastAfterSignupFail()
      this.email='';
      this.password='';
    })
  }

  public async toastAfterSignup(){
    const toast=await this.toastController.create({
      message: 'Cuenta creada satisfactoriamente',
      duration: 3000
    });

    toast.present();
  }

  public async toastAfterSignupFail(){
    const toast=await this.toastController.create({
      message: 'Algo fue mal durante la creación de cuenta',
      duration: 3000
    });

    toast.present();
  }
}
