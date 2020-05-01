import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service'

import { User } from 'src/app/models/user'
import { Router } from '@angular/router'
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AngularFireAuth} from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  user: User = new User();
  user2: User = new User();
  public isLogged: any = false;
  constructor(
    private utils: UtilitiesService,
    public auser: AngularFireAuth,
    private fb: FormBuilder,
    public router: Router,
    public toaster: ToastController,
    public load: LoadingController,
    public alert: AlertController) {
      this.auser.authState.subscribe(user => (this.isLogged = user));
     }

  ngOnInit() {
    this.validations();
  }
  validations(): void {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.]+[.][a-zA-Z0-9]+')])],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern('[a-zA-Z0-9]+')
      ])]
    });
  }
  async createToast() {
    const toast = await this.toaster.create({
      message: 'Login correcto',
      duration: 500
    });
    toast.present();
  }
  async LoadPag() {
    const loading = await this.load.create({
      message: 'Por favor,espera',
      duration: 2000,
    });
    this.createToast();
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  getUser(){
    this.user.email=this.myForm.get('email').value;
    this.user.pass=this.myForm.get('password').value;
  }
  
  async Login() {
    const user = await this.utils.signInEmail(this.user);
    if (this.user) {
      this.LoadPag();
      this.createToast();
      this.router.navigate(['/tabs']);
    }
    else {
      const alert = await this.alert.create({
        header: 'Datos incorrectos',
        message: 'Datos introducidos erroneos',
        buttons: [{
          text: 'Salir'
        }]
      });
      await alert.present();
    }
  }
  redirectCreate() {
    this.router.navigateByUrl('/create')
  }
}
