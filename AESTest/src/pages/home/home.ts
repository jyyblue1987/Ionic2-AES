import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	key: any;
	iv: any;
	plain_text: string;
	encrypted_text: string;  
	payment_var: string;
  decrypted_text: string;
  	constructor(public navCtrl: NavController) {
        this.key = CryptoJS.enc.Hex.parse("882E91D56547F1CF7ED6BAAD9C3EAAF5");
	    this.iv  = CryptoJS.enc.Hex.parse("2811da22377d62fcfdb02f29aad77d9e");

	    this.plain_text = '';
      this.payment_var = '';
	    this.encrypted_text = '';
	    this.decrypted_text = '';
  	}

    padOrTruncate(str: string) : string {
      var result: string = '';
      if( str.length % 32 == 0 )
          return str;

      result = str + '';
      while( !(result.length % 32 == 0) )
      {
        result = result + " ";
      }

      return result;
    }

  	encrypt(event): void {
  		var text = this.padOrTruncate(this.plain_text);

      // padding and truncating
  		var encrypted = CryptoJS.AES.encrypt(text, this.key, {
                // iv: this.iv,
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.NoPadding
              });

      this.encrypted_text = CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
      this.payment_var = "https://secure2.paymentus.com/cp/hoig/make-payment-express?authToken=" + this.encrypted_text;
  	}

  	decrypt(event): void {
  		var decrypted = CryptoJS.AES.decrypt(this.encrypted_text, this.key, {
	                                          // iv: this.iv,
	                                          mode: CryptoJS.mode.ECB,
	                                          padding: CryptoJS.pad.NoPadding
	                                        }).toString();

  		this.decrypted_text = decrypted;	    
  	}


}
