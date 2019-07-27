import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SlideshowModule} from 'ng-simple-slideshow';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home';
import { OCommonModule } from './common';

import { HttpRequestService } from './common/http.request.service';
import { Utils } from './common/Utils';
import { MovieModule } from './modules/video';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlideshowModule,
    ToasterModule,
    HomeModule,
    MovieModule,
    OCommonModule
  ],
  providers: [
    HttpRequestService,
    Utils,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
