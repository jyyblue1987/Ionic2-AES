import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

let storage = new Storage();

@Injectable()
export class AuthService {
	key: any;
	iv: any;
	data: any;
  	constructor(public http: Http) {
  		this.key = CryptoJS.enc.Hex.parse("882E91D56547F1CF7ED6BAAD9C3EAAF5");
	    this.iv  = CryptoJS.enc.Hex.parse("2811da22377d62fcfdb02f29aad77d9e");

  		this.http = http;
    	this.data = null;
    	console.log('Hello AuthService Provider');
  	}

  	login(username:string, password:string): any {
  		// mock login 
  		return Observable.create(observer => {
            observer.next({username: username, password: password});
            observer.complete();
        });
	    // return this.http.get( './mocks/login.json' )
     //    	.map((res: Response) => {
     //    		return res.json();
     //    	});
  	}

  	encrypt(username: string, password: string) {
      var data = {username: username, password: password};
  		var plaint_text = JSON.stringify(data);

  		var encrypted = CryptoJS.AES.encrypt(plaint_text, this.key, {
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
              }).toString();

  		storage.set('encrypted', encrypted);
  		storage.set('touch_id_flag', 1);
  	}

  	loginWithDecrypt(): any {
  		var self = this;
  		
  		return new Promise(function(resolve, reject) {
  			storage.get('encrypted').then((val) => {
	         	var decrypted = CryptoJS.AES.decrypt(val, self.key, {
		                                          iv: self.iv,
		                                          mode: CryptoJS.mode.CBC,
		                                          padding: CryptoJS.pad.Pkcs7
		                                        }).toString(CryptoJS.enc.Utf8);

	  			var res = JSON.parse(decrypted);
	  			var username = res.username;
	  			var password = res.password;

	  			self.login(username, password).subscribe(response => {
		            resolve(response);
		        });
	        });
		});	  		
  	}

}
