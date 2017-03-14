import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})
export class LoginPage {
	username: string;
	password: string;
  	constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
  		this.username = '';
  		this.password = '';
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad LoginPage');
  	}

  	login(event): void {  		
	   	// this.auth.login(this.username, this.password).subscribe(response => {
     //        this.auth.encrypt(response.username, response.password);
     //    });
     	this.auth.loginWithDecrypt().then( data => console.log(data) );
  	}

}
