import { Injectable } from "@angular/core";
import {HttpHeaders, HttpParams, HttpClient, HttpHandler, HttpRequest} from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from '../../environments/environment';
import { Utils } from './Utils';
import * as AppConfig from '../../config/app.config';

interface IHttpOptions {
  body?: any;
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: "arraybuffer" | "blob" | "json" | "text";
  withCredentials?: boolean;
}

@Injectable()
export class HttpRequestService extends HttpClient {
  constructor(handler: HttpHandler, private utils: Utils) {
    super(handler);
  }

  request<T>(
    first: string | HttpRequest<any>,
    url?: string,
    options: IHttpOptions = {}
  ): Observable<T> {
    url = this.getFullPath(url);
    if (!options) options = {};
    if (!options.headers) options.headers = new HttpHeaders();
    if (typeof first !== "string" && !first.headers) {
      first = (first as HttpRequest<any>).clone({
        headers: new HttpHeaders()
      });
    }
    if (typeof first !== "string")
      first = (first as HttpRequest<any>).clone({
        withCredentials: false
      });
    options.withCredentials = false;
    
    return super.request(first as any, url, options);
  }

  getFullPath(url: string): string {
    if (this.utils.isNNull(url) && !url.startsWith("http://") && !url.startsWith("https://")) {
      url = environment.rootService + url;
    }

    if (AppConfig.URL_TOKEN === false)  {
      return url;
    }

    if (url.indexOf('api_key') > -1) {
      return url;
    }

    if (url.indexOf('?') > -1) {
      url += "&";
    } else {
      url += "?";
    }
    url += "api_key=" + environment.apiKEY;
    return url;
  }
}
