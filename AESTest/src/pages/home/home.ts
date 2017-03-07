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
	decrypted_text: string;
  	constructor(public navCtrl: NavController) {
        this.key = CryptoJS.enc.Hex.parse("882E91D56547F1CF7ED6BAAD9C3EAAF5");
	    this.iv  = CryptoJS.enc.Hex.parse("2811da22377d62fcfdb02f29aad77d9e");

	    this.plain_text = '';
	    this.encrypted_text = '';
	    this.decrypted_text = '';
  	}

  	encrypt(event): void {
  		var text = this.plain_text;
  		var encrypted = CryptoJS.AES.encrypt(text, this.key, {
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
              }).toString();

	    this.encrypted_text = encrypted;
  	}

  	decrypt(event): void {
  		var decrypted = CryptoJS.AES.decrypt(this.encrypted_text, this.key, {
	                                          iv: this.iv,
	                                          mode: CryptoJS.mode.CBC,
	                                          padding: CryptoJS.pad.Pkcs7
	                                        }).toString(CryptoJS.enc.Utf8);

  		this.decrypted_text = decrypted;	    
  	}


}
