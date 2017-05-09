import { Component } from '@angular/core';
import {Events} from 'ionic-angular';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({    
  providers: []
})
export class BasePage {
	constructor(public events: Events) {
  		
  	}

  	ionViewDidEnter() {
  		this.events.publish('action_user');
  	}
}
