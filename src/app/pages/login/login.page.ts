import { Component, OnInit, ViewChild } from '@angular/core';

import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { NativeKeyboard } from '@ionic-native/native-keyboard/ngx';

import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // capturando o elemento ion-slides (sem necessidade de alias por só haver um na página)
  @ViewChild(IonSlides) private slides: IonSlides;

  public userName: string;

  public userLogin: User = {};

  public userRegister: User = {};

  private loading: any;

  private toast: any;

  // adicionando a propriedade keyboard ao mesmo tempo que passando ao constructor
  constructor(public keyboard: NativeKeyboard, private loadCtrl: LoadingController, private toastCtrl: ToastController, private authService: AuthService) { }

  ngOnInit() { }

  // função executada para alterar o ion-segment  
  public segmentChanged(event: any) {
    // console.log(event);
    if (event.detail.value === "login") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  // executar o login do service  
  public async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      let message: string;

      switch (error.code) {
        case "auth/email-already-in-use":
          message = "E-mail sendo usado";
          break;
        case "auth/argument-error":
          message = "Preencha os campos corretamente";
          break;
        case "auth/user-not-found":
          message = "Usuário não encontrado";
          break;
        case "auth/wrong-password":
          message = "Senha incorreta";
          break;
        case "auth/invalid-email":
          message = "Email inválido";
          break;
        case "auth/network-request-failed":
          message = "Sem conexão";
          break;
        default:
          console.log(error.code);
          break;
      }

      this.presentToast(message);
    } finally {
      this.loading.dismiss();
      this.userName = "";
      this.userLogin = {};
    }
  }

  // executar o registro do service
  public async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
    } catch (error) {
      let message: string;

      switch (error.code) {
        case "auth/email-already-in-use":
          message = "E-mail já sendo usado";
          break;
        case "auth/argument-error":
          message = "Preencha os campos corretamente";
          break;
        case "auth/user-not-found":
          message = "Usuário não encontrado";
          break;
        case "auth/wrong-password":
          message = "Senha incorreta";
          break;
        case "auth/invalid-email":
          message = "Email inválido";
          break;
        case "auth/network-request-failed":
          message = "Sem conexão";
          break;
        case "auth/weak-password":
          message = "A senha deve ter pelo menos 6 caracteres";
          break;
        default:
          console.log(error.code);
          break;
      }

      this.presentToast(message);
    } finally {
      this.loading.dismiss();
      this.userName = "";
      this.userRegister = {};
    }

  }

  // apresentar o loading
  async presentLoading() {
    this.loading = await this.loadCtrl.create({
      cssClass: 'olsk-loading',
      message: 'Por favor, aguarde'
    });

    return this.loading.present();
  }

  // apresentar o toast com informações ao usuário
  async presentToast(message: string) {
    this.toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });

    return this.toast.present();
  }

}
