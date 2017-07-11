import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TouchIdPage } from '../pages/touch-id/touch-id';
import { PdfPage } from '../pages/pdf/pdf';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { VotingPage } from '../pages/voting/voting';
import { ResultsPage } from '../pages/results/results';

import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {Events} from 'ionic-angular';
import {httpFactory} from "../providers/http.factory";

@NgModule({
  declarations: [
    MyApp,    
    HomePage,
    LoginPage,
    TouchIdPage,
    PdfPage,
    VotingPage,
    ResultsPage,
    PdfViewerComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,    
    HomePage,
    LoginPage,
    TouchIdPage,
    PdfPage,
    VotingPage,
    ResultsPage,
    PdfViewerComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
              {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions, Events]
        }]
})
export class AppModule {}
