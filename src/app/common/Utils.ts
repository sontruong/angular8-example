import {Injectable} from '@angular/core';
import { OneMsg } from './objs';
import {HttpResponse} from '@angular/common/http';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { Router } from '@angular/router';

@Injectable()
export class Utils {
  
  public convertError(error: any): OneMsg {
    const message: OneMsg = new OneMsg();
      try {
        const body = error.error || '';
        message.status_code = body.status_code;
        message.status_message = body.status_message;
      } catch (error) {
      }
    return message;
  }

  protected showToast(toasterService: ToasterService, type: string, title: string, body: string, router: Router, url: string) {
      const toast: Toast = {
        type: type,
        title: title,
        body: body,
        timeout: 2000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };
      toasterService.popAsync(toast).subscribe(() => {});
      if (null != router && null != url) {
        router.navigate([url]);
      };
  }
  
  public showEToast(toasterService: ToasterService, error: any) {
    let msg: OneMsg = this.convertError(error);
    let body = msg.status_message;
    if (this.isNull(body)) {
      body = 'Error';
    }
    this.showToast(toasterService, 'error', 'Error', body, null, null);
  }

  public isTrue(b: boolean) {
    if (this.isNull(b)) {
      return false;
    }
    return b;
  }
  
  public isValid(obj: any): boolean {
    return obj !== null && obj !== undefined;
  }

  public getJson(res: Response): any {
    try {
      return res.json() 
    } catch {
      return null;
    }
  }

  generateHeader(): Headers {
    const headers = new Headers({'Content-Type': 'application/json'});
    return headers;
  }

  parseDateString(dateStr: string) {
    let date = new Date(dateStr);
    return this.parseJVDate(date);
  }

  parseDate(date: any): Date {
    return new Date(date.year, date.month - 1, date.day);
  }

  parseNumberDate(timestamp: any): Date {
    return new Date(timestamp);
  }

  parseNumberToStringDate(timestamp: any): any {
    let date = this.parseNumberDate(timestamp);
    return this.getDateObject(date.getDate(), (date.getMonth() + 1), date.getUTCFullYear());(new Date(timestamp));
  }

  parseTsDate(date: any): any {
    if (date instanceof Date) {
      return date;
    }
    if (null === date || undefined === date) {
      return null;
    }
    const tmp: Date = new Date(date);
    return tmp;
  }

  parseLocalDate(timesheetDate: number[]) {
    let result = new Date(timesheetDate[0], timesheetDate[1]-1, timesheetDate[2]);
    return result;
  }

  createTsDateNow(): any {
    const tmp: Date = new Date();
    const dateModel: any = {
      'year': tmp.getUTCFullYear(),
      'month': tmp.getMonth() + 1,
      'day': tmp.getDate(),
    };
    return this.parseJVDate(tmp);
  }

  public getDate(date: Date, day: number): Date {
    return new Date(date.getUTCFullYear(), date.getMonth(), day);
  }

  getNumOfDay(date1: Date, date2: Date): number {
    var res = Math.abs(date2.getTime() - date1.getTime()) / 1000;
    var days = Math.floor(res / 86400);
    return days;
  }

  getLastDayOfMonth(date: Date): number {
    let tmp = new Date(date.getUTCFullYear(), date.getMonth() + 1, 0);
    return tmp.getDate();
  }

  parseTimestampDate(date: any): any {
    if (null === date || undefined === date) {
      return null;
    }

    const tmp: Date = new Date(this.parseJVDate(date));
    const timestamp = tmp.getTime();
    return timestamp;
  }

  parseJVDate(date: any): any {
    if (date instanceof Date) {
      return this.getDateObject(date.getDate(), (date.getMonth() + 1), date.getUTCFullYear());
    }
    if (null === date || undefined === date) {
      return null;
    }
    if (date.day < 0 || date.day > 31 || date.month < 0 || date.month > 12 || date.year < 0) {
      return null;
    }
    return this.getDateObject(date.day, date.month, date.year);
  }

  getDateObject(day: any, month: any, year: any) {
    let tM = month.toString();
    if (tM.length === 1) {
      tM = '0' + tM;
    }
    let tD = day.toString();
    if (tD.length === 1) {
      tD = '0' + tD;
    }
    return '' + year + '-' + tM + '-' + tD;
  }

  equalWithoutTime(date1: Date, date2: Date): boolean {
    if (date1.getFullYear() != date2.getFullYear()) {
      return false;
    }
    if (date1.getMonth() != date2.getMonth()) {
      return false;
    }
    if (date1.getDate() != date2.getDate()) {
      return false;
    }
    return true;
  }

  deepCopy(oldObj: any) {
    let newObj = oldObj;
    if (oldObj && (typeof oldObj === 'object')) {
      newObj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {};
      for (const i in oldObj) {
        if (oldObj.hasOwnProperty(i)) {
          newObj[i] = this.deepCopy(this.isValid(oldObj[i]) ? oldObj[i].valueOf() : oldObj[i]);
        }
      }
    }
    return newObj;
  }

  downloadFile(data: Blob) {
    const url = window.URL.createObjectURL(data);
    window.open(url);
  }

  downloadFileLink(data: Blob) {
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = "" + new Date().getMilliseconds();;
    link.click();
  }

  isEmpty(obj: string): boolean {
    if (undefined === obj || null === obj || '' === obj){
      return true;
    }
    return false;
  }

  isNull(obj: any): boolean {
    if (undefined === obj || null === obj){
      return true;
    }
    return false;
  }

  isBothNull(obj: any, obj2: any): boolean {
    if ((undefined === obj || null === obj) && (undefined === obj2 || null === obj2)){
      return true;
    }
    return false;
  }

  isPositiveNumber(obj: number): boolean {
    if (undefined == obj || null == obj){
      return false;
    }
    if (obj >=0) {
      return true;
    }
    return false;
  }

  getNumber(n: number): number {
    if (undefined === n || null === n || NaN === n){
      n = 0;
    }
    return n;
  }
  plus(n1: number, n2: number): number {
    n1 = this.getNumber(n1);
    n2 = this.getNumber(n2);
    return n2 + n1;
  }

  minus(n1: number, n2: number): number {
    n1 = this.getNumber(n1);
    n2 = this.getNumber(n2);
    return n1 - n2;
  }

  multiply(n1: number, n2: number): number {
    n1 = this.getNumber(n1);
    n2 = this.getNumber(n2);
    return n1 * n2;
  }

  getVatMoney(vat: number, money: number): number {
    vat = this.getNumber(vat);
    vat = this.divide(vat, 100);
    return this.multiply(money, vat);
  }

  divide(n1: number, n2: number): number {
    n1 = this.getNumber(n1);
    n2 = this.getNumber(n2);
    return n1/n2;
  }

  isNNull(obj: any): boolean {
    if (undefined != obj && null != obj){
      return true;
    }
    return false;
  }

  isArrNNull(objs: any[]): boolean {
    if (undefined != objs && null != objs && 0 < objs.length){
      return true;
    }
    return false;
  }

  isArrNull(objs: any[]): boolean {
    if (undefined === objs || null == objs || 0 === objs.length){
      return true;
    }
    return false;
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  dateAddDays(date: Date, days: number): string {
    date.setDate(date.getDate() + days);
    return '' + date.getUTCFullYear() + '-' + date.getUTCMonth() + '-' + date.getUTCDate();
  }

}
