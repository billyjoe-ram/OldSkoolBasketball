import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public products = new Array<Product>();
  private productsSubscription: Subscription;

  private loading: any;
  private toast: any;
  
  constructor(private productsService: ProductService, private authService: AuthService, private loadCtrl: LoadingController, private toastCtrl: ToastController) {
    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch(error) {
      console.error(error);      
    }    
  }

  async deleteProduct(id: string) {
    try {
      await this.productsService.deleteProduct(id);
    } catch(error) {
      this.presentToast("Erro ao deletar");
      console.error(error);      
    }    
  }

  private async presentToast(message: string) {
    this.toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });

    return this.toast.present();
  }

}
