import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SlideshowModule } from 'ng-simple-slideshow';
import { RatingModule } from 'ng-starrating';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { HomeComponent } from './component/home.component';
import { MovieModule } from '../video';


@NgModule({
    imports: [
      CommonModule,
      SlideshowModule,
      RatingModule,
      LayoutModule,
      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatTabsModule,
      MatButtonModule,
      FlexLayoutModule,
      BrowserAnimationsModule,
      MovieModule
    ],
    declarations: [
        HomeComponent,
    ],
    exports: [
        HomeComponent
    ],
    entryComponents: [
        HomeComponent,
    ],
    providers: [

    ],
  })
export class HomeModule {}