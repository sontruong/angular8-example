import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { HttpRequestService } from './http.request.service';
import { Utils } from './Utils';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [

  ],
  exports: [

  ],
  providers: [
    HttpRequestService,
    Utils
  ],
})
export class OCommonModule {}
