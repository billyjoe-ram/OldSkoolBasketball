import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {

  public product: Product = {};
  private productId: string = null;  
  private productsSubscription: Subscription;
  
  private loading: any;
  private toast: any;
  
  constructor(private loadCtrl: LoadingController, private toastCtrl: ToastController, private authService: AuthService, private activRoute: ActivatedRoute, private navCtrl: NavController, private productsService: ProductService) {
    this.productId = this.activRoute.snapshot.params["id"];

    if(this.productId) {
      this.loadProduct();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  public async saveProduct() {
    await this.presentLoading();

    this.product.userId = (await this.authService.getAuth().currentUser).uid;        
    
    if (this.productId) {
      try {
        await this.productsService.updateProduct(this.productId, this.product);        

        this.navCtrl.navigateBack("/home");
      } catch (error) {
        console.error(error);        
        this.presentToast("Erro ao tentar salvar...")        
      } finally {
        this.loading.dismiss();
      }

    } else {      
      this.product.createdAt = new Date().getTime();

      try {
        await this.productsService.addProducts(this.product);        

        this.navCtrl.navigateBack("/home");
      } catch (error) {
        console.error(error);        
        this.presentToast("Erro ao tentar salvar...");
        // this.loading.dismiss();
      } finally {
        this.loading.dismiss();
      }
    }
  }
  
  private loadProduct() {
    this.productsSubscription = this.productsService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    });
  }
  
  private async presentLoading() {
    this.loading = await this.loadCtrl.create({
      cssClass: 'olsk-loading',
      message: 'Por favor, aguarde'
    });

    return this.loading.present();
  }

  private async presentToast(message: string) {
    this.toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });

    return this.toast.present();
  }  

}
