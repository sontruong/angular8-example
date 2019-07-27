import {environment} from '../../environments/environment';
import { OnInit, AfterViewInit } from '@angular/core';

export class Base implements OnInit, AfterViewInit {
        
    public imageURL = environment.imageUrl;

    ngOnInit(): void {
        //tbd
    }

    ngAfterViewInit(): void {
        //tbd
    }
}