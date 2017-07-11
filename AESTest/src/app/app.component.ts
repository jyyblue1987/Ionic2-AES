import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TouchIdPage } from '../pages/touch-id/touch-id';
import { PdfPage } from '../pages/pdf/pdf';
import {Events} from 'ionic-angular';

let storage = new Storage();

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  action_time: any;
  idleChecker: any;

  constructor(platform: Platform, public events: Events) {
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

        this.checkIdle();
    });
  }

  checkIdle() {
    this.action_time = new Date().getTime();

    this.events.subscribe('action_user',() => {
      console.log('action_user');
      this.action_time = new Date().getTime();          
    });  

    this.events.subscribe('http_request',() => {
      console.log('http_request');
      this.action_time = new Date().getTime();          
    });  

    var self = this;

    this.idleChecker = setInterval(function() {
         var current_time = new Date().getTime();
         if( current_time - self.action_time > 10 * 1000 )
         {
           console.log('timeout');
           self.gotoLoginPage();
           self.action_time = current_time;
         }
     }, 1000 * 10);
  }

  gotoLoginPage() {
    this.nav.setRoot(LoginPage);
  }
}
