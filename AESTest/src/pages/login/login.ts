import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import { AlertController } from 'ionic-angular';

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
  	constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, public alertCtrl: AlertController) {
  		this.username = '';
  		this.password = '';
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad LoginPage');
  	}

  	login(event): void {  		
	   	this.auth.login(this.username, this.password).subscribe(response => {            
            this.showAlert();
        });
     	
     	// 
  	}

  	showMessage(message:string) {
  		let alert = this.alertCtrl.create({
	    	title: 'Login',
	    	subTitle: message,
	    	buttons: ['OK']
	    });

	    alert.present();
  	}

	showAlert() {
	    let alert = this.alertCtrl.create({
	    	title: 'Login',
	    	subTitle: 'Do you want to use touch id to log in next time?',
	    	buttons: [
	        	{
	          		text: 'Cancel',
	          		handler: data => {
	            		console.log('Cancel clicked');
	          		}
	        	},
	        	{
	          		text: 'OK',
		          	handler: data => {
		          		this.auth.encrypt(this.username, this.password);
		            	this.showMessage("Login is OK");
		          	}
	        	}
      		]
	    });

	    alert.present();
	}
}
