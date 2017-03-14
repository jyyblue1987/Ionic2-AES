import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import { TouchID } from 'ionic-native';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the TouchId page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-touch-id',
  templateUrl: 'touch-id.html',
  providers: [AuthService]
})
export class TouchIdPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, public alertCtrl: AlertController) {}

	ionViewDidLoad() {
	  console.log('ionViewDidLoad TouchIdPage');
	}

	login(event): void {  		
		TouchID.isAvailable()
		.then(
		  res => this.doLogin(),
		  err => this.showMessage('TouchID is not available')
		);

	}

	doLogin(): void {
		TouchID.verifyFingerprint('Scan your fingerprint please')
			.then(
  				res => this.auth.loginWithDecrypt().then( data => this.showMessage('Login is OK') ),
  				err => this.showMessage('Touch ID is not correct')
			);
	}

	showMessage(message:string) {
  		let alert = this.alertCtrl.create({
	    	title: 'Touch ID',
	    	subTitle: message,
	    	buttons: ['OK']
	    });

	    alert.present();
  	}

}
