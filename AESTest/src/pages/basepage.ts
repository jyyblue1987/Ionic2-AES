import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({    
  providers: []
})
export class BasePage {
	constructor(public navCtrl: NavController, public navParams: NavParams) {
  		
  	}

  	ionViewDidEnter() {
  		console.log('ionViewDidEnter BasePage');	
  	}

  	ionViewDidLeave() {
  		console.log('ionViewDidLeave BasePage');	
  	}
}
