import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {Events} from 'ionic-angular';
import {HttpService} from "./http-service";

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, events: Events): Http {
    return new HttpService(xhrBackend, requestOptions, events);
}