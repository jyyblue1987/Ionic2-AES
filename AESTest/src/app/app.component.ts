import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TouchIdPage } from '../pages/touch-id/touch-id';
import { PdfPage } from '../pages/pdf/pdf';

let storage = new Storage();

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        Splashscreen.hide();
        this.rootPage = PdfPage;
        // storage.set('touch_id_flag', 0);
        storage.get('touch_id_flag').then((val) => {
          if(val == 1)
          {
            this.rootPage = TouchIdPage;
          }
          else
          {
            this.rootPage = LoginPage;
          }
        });  
    });
  }
}
