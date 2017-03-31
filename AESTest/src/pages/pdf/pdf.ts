import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Pdf page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html'
})
export class PdfPage {

  	constructor(public navCtrl: NavController, public navParams: NavParams) {}

  	ionViewDidLoad() {
    console.log('ionViewDidLoad PdfPage');
  	}

  	download(): void {
		
	}



}
