import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TouchIdPage } from '../pages/touch-id/touch-id';
import { PdfPage } from '../pages/pdf/pdf';

import { VotingPage } from '../pages/voting/voting';
import { ResultsPage } from '../pages/results/results';

import {Events} from 'ionic-angular';

let storage = new Storage();

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  
  constructor(platform: Platform, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        Splashscreen.hide();
        this.rootPage = VotingPage;        
    });
  }
}
