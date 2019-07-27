import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from './service/service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';

import { ListComponent } from './component/list.component';

@NgModule({
    imports: [
      CommonModule,
      MatGridListModule,
      MatTooltipModule,
      MatCardModule
    ],
    declarations: [
      ListComponent
    ],
    exports: [
      ListComponent
    ],
    entryComponents: [
      ListComponent
    ],
    providers: [
        MovieService
    ],
  })
export class MovieModule {}