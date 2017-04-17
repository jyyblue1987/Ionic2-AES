import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import { TouchID } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { AndroidFingerprintAuth, AFAAuthOptions } from '@ionic-native/android-fingerprint-auth';

/*
  Generated class for the TouchId page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-touch-id',
  templateUrl: 'touch-id.html',
  providers: [AuthService, AndroidFingerprintAuth]
})
export class TouchIdPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, public alertCtrl: AlertController, public plt: Platform, private androidFingerprintAuth: AndroidFingerprintAuth) {}

	ionViewDidLoad() {
	  console.log('ionViewDidLoad TouchIdPage');
	}

	login(event): void {  		
		if( this.plt.is('android') )
      	{
        	this.androidFingerprintAuth.isAvailable()
			  .then((result)=> {
			    if(result.isAvailable){
			      this.doLogin();
			    } else {
			      // fingerprint auth isn't available
			      this.showMessage('Fingerprint auth is not available');
			    }
			  })
			  .catch(error => this.showMessage('Fingerprint auth is not available') );
      	}

      	if( this.plt.is('ios') )
      	{
        	TouchID.isAvailable()
				.then(
				  res => this.doLogin(),
				  err => this.showMessage('TouchID is not available')
				);
      	}

		// this.auth.loginWithDecrypt().then( data => this.showMessage('Login is OK') )

	}

	doLogin(): void {
		if( this.plt.is('android') )
      	{
      		this.auth.loginWithFingerprint().then( data => this.showMessage('Login is OK') );
      	}

		if( this.plt.is('ios') )
      	{
			TouchID.verifyFingerprint('Scan your fingerprint please')
				.then(
	  				res => this.auth.loginWithDecrypt().then( data => this.showMessage('Login is OK') ),
	  				err => this.showMessage('Touch ID is not correct')
				);
		}
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
