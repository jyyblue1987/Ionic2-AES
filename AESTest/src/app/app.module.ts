import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TouchIdPage } from '../pages/touch-id/touch-id';
import { PdfPage } from '../pages/pdf/pdf';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TouchIdPage,
    PdfPage,
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
    PdfViewerComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
