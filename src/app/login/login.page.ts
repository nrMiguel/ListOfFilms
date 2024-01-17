import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email='';
  public password='';
  public nombreEmail='';
  public indiceArroba=0;
  
  constructor(private route: Router, public fireAuth: AngularFireAuth, private toastController: ToastController) { }

  ngOnInit() {
  }

  // Probablemente no use esto.
  public goToHome(){
    this.route.navigate(['/home']);
  }

  public attemptLogin(){
    this.fireAuth.signInWithEmailAndPassword(this.email, this.password)
    .then(res => {
      this.toastAfterLog();
      this.indiceArroba=this.email.indexOf('@');
      this.nombreEmail=this.email.substring(0, this.indiceArroba);
      this.route.navigate(['/home/' + this.nombreEmail]);
    }).catch(error=>{
      this.toasAfterLogFail(error);
      this.email='';
      this.password='';
    })
  }

  public async toastAfterLog(){
    const toast=await this.toastController.create({
      message: 'Login satisfactorio',
      duration: 3000
    });

    toast.present();
  }

  public async toasAfterLogFail(err){
    const toast=await this.toastController.create({
      message: 'Algo fue mal durante el login' + err,
      duration: 3000
    });

    console.log(err);
    toast.present();
  }
}
