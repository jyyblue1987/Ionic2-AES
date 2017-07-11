import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CatService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CatService {
	API_URL: string = 'http://thecatapi.com/api/';
	api_key: string = 'MjAyOTE0';
	sub_id: string = '100';
  	constructor(public http: Http) {
    	console.log('CatService Provider');
  	}

  	get(page:number): any {
	    return this.http.get( this.API_URL + 'images/get?format=xml&results_per_page=' + page )
        	.map((res: Response) => {
        		return res;
        	});
  	}
}
