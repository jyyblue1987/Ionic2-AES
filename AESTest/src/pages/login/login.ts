import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import { AlertController } from 'ionic-angular';
import { BasePage } from '../basepage';
import { PdfPage } from '../pdf/pdf';
import {Events} from 'ionic-angular';

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
export class LoginPage extends BasePage{
	username: string;
	password: string;
  	constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, public alertCtrl: AlertController, public events: Events) {
  		super(events);
  		this.username = '';
  		this.password = '';
  	}

  	login(event): void {  		
	   	this.auth.login(this.username, this.password).subscribe(response => {            
            this.showAlert();
        });
     	
     	// 
     	this.navCtrl.push(PdfPage);
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
	    	subTitle: 'Do you want to use Fingerprint to log in next time?',
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
		          		this.auth.encrypt(this.username, this.password).then((result)=> {
					    		this.showMessage("Login is OK");
				  		})
				  		.catch(error => this.showMessage(error) );		            	
		          	}
	        	}
      		]
	    });

	    alert.present();
	}
}
