import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CatService} from '../../providers/cat-service';

/*
  Generated class for the Voting page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  	selector: 'page-voting',
  	templateUrl: 'voting.html',
  	providers: [CatService]
})
export class VotingPage {

  	constructor(public navCtrl: NavController, public navParams: NavParams, private cat: CatService) {}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad VotingPage');
    	this.getCatImageList();    	
  	}

  	getCatImageList() {
  		this.cat.get(100).subscribe(response => {            
            console.log(response);
            var cat_list = response._body;
        });
  	}
}
