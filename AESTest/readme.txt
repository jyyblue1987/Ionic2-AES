- Refrence files

1) page transition
- Base.ts(copy)
- For all Page
	import {Events} from 'ionic-angular';
	
	export class LoginPage extends BasePage
	
	constructor(public events: Events) {
  		super(events);  		
  	}

- app.compenents.ts
	import { Component, ViewChild } from '@angular/core';
	import { Platform, NavController, Nav } from 'ionic-angular';
	import {Events} from 'ionic-angular';
	
	@ViewChild(Nav) nav: Nav;

	constructor(platform: Platform, public events: Events) {
	
	this.checkIdle();
	
	checkIdle() {
		this.action_time = new Date().getTime();

		this.events.subscribe('action_user',() => {
		  console.log('action_user');
		  this.action_time = new Date().getTime();          
		});  
		
		this.events.subscribe('http_request',() => {
		  console.log('http_request');
		  this.action_time = new Date().getTime();          
		});  

		var self = this;

		this.idleChecker = setInterval(function() {
			 var current_time = new Date().getTime();
			 if( current_time - self.action_time > 10 * 1000 )
			 {
			   console.log('timeout');
			   self.gotoLoginPage();
			   self.action_time = current_time;
			 }
		 }, 1000 * 10);
	  }

	gotoLoginPage() {
		this.nav.setRoot(LoginPage);
	}
	
2) http intercept

- http.service.ts - copy
- http.factory.ts - copy	
- app.module.ts
	import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
	import {Events} from 'ionic-angular';
	import {httpFactory} from "../providers/http.factory";
	
	{
		provide: Http,
		useFactory: httpFactory,
		deps: [XHRBackend, RequestOptions, Events]
	}
	