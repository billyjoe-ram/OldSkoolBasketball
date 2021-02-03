import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // capturando o elemento ion-slides (sem necessidade de alias por só haver um na página)
  @ViewChild(IonSlides) private slides: IonSlides;
  
  // adicionando a propriedade keyboard ao mesmo tempo que passando ao constructor
  constructor(public keyboard: Keyboard) { }

  ngOnInit() {}

  // função executada para alterar o ion-segment
  // retirar o comentário no log para ver o evento passado
  public segmentChanged(event: any) {
    // console.log(event);
    if (event.detail.value === "login") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

}
