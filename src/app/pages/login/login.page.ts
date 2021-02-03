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

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.2.5/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyBocg_h6lQeloWzJMnuHFq2OeS45LKoE-w",
//     authDomain: "old-skool-basketball.firebaseapp.com",
//     projectId: "old-skool-basketball",
//     storageBucket: "old-skool-basketball.appspot.com",
//     messagingSenderId: "432824905625",
//     appId: "1:432824905625:web:9a34af8eba44cc020a6d08",
//     measurementId: "G-VHC3CX7J8T"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>
