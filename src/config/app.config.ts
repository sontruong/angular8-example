import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export let TOAST_MESSAGE_TIMEOUT = 3000;
export let COUNTRY_CODE = 'en';
export let URL_LOGIN = '';
export let URL_TOKEN = true;

export class AppConfig {

}

export const OneSolConfig = {
    sso: false
}