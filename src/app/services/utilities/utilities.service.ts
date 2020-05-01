import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Product } from 'src/app/models/product'
import { AngularFirestore } from '@angular/fire/firestore';
import {User} from 'src/app/models/user'
import { AngularFireAuth} from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public isLogged: any = false;
  public Products: Product[];
  constructor(
    public toaster: ToastController,
    public load: LoadingController,
    public alert: AlertController,
    private firestore: AngularFirestore,
    public af: AngularFireAuth
  ) { 
    this.af.authState.subscribe(user => (this.isLogged = user));
  }
  async createToast(msj: string) {
    const toast = await this.toaster.create({
      message: msj,
      duration: 500
    });
    toast.present();
  }
  async LoadPag() {
    const loading = await this.load.create({
      message: 'Por favor,espera',
      duration: 500,
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }
  createProduct(product: Product) {
    return this.firestore.collection('products').add(product);
  }
  signInEmail(user: User) {
    this.af.signInWithEmailAndPassword(user.email, user.pass)
      .catch(function (error) {
      })
  }
}
