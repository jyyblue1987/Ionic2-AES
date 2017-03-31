import { Component } from '@angular/core';
import { TouchID } from 'ionic-native';
import { NavController, AlertController} from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(private alertCtrl: AlertController) {
  

  }
// Method to present pop ups if user was successful or not
  verify(){
   
     let alert = this.alertCtrl.create({
      title: 'Authorized!',
      subTitle: 'You got access!',
      buttons: ['OK']
    });

    let alertDenied = this.alertCtrl.create({
      title: 'Unauthorized!',
      subTitle: 'Authentication failed',
      buttons: ['OK']
    });
   
  // This section checks the users touch id if it is valid.   
    TouchID.verifyFingerprint('Scan your fingerprint please')
.then(
  //res variable if the fingerprint was valid
  res =>  alert.present(),

  //error if the finger print was invalid
  err => alertDenied.present(),
);

  }

}
