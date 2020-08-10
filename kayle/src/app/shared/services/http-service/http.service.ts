import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private headers: HttpHeaders = new HttpHeaders({});

  private DEFAULT_REQUEST_OPTIONS = {
    headers: this.headers,
  };

  constructor(public http: HttpClient) {
  }

  private generateRequestOptions(requestOptions = {}): any {
    return { ...this.DEFAULT_REQUEST_OPTIONS, ...requestOptions };
  }

  private generateUrlParams(params: { [p: string]: string }): HttpParams {
    return new HttpParams({ fromObject: params });
  }

  public get(url: string, urlParams: { [param: string]: string } = {}, requestOptions: any = {}): Observable<any> {
    const params: HttpParams = this.generateUrlParams(urlParams);
    requestOptions = this.generateRequestOptions(requestOptions);
    requestOptions.params = params;

    return this.http.get(url, requestOptions).pipe(take(1));
  }

  public post(url: string, data: any = {}, urlParams: { [param: string]: string } = {}, requestOptions: any = {}): Observable<any> {
    const params: HttpParams = this.generateUrlParams(urlParams);
    requestOptions = this.generateRequestOptions(requestOptions);
    requestOptions.params = params;
    return this.http.post(url, data, requestOptions).pipe(take(1));
  }

  public put(url: string, data: any = {}, urlParams: { [param: string]: string } = {}, requestOptions: any = {}): Observable<any> {
    const params: HttpParams = this.generateUrlParams(urlParams);
    requestOptions = this.generateRequestOptions(requestOptions);
    requestOptions.params = params;
    return this.http.put(url, data, requestOptions).pipe(take(1));
  }

  public patch(url: string, data: any = {}, urlParams: { [param: string]: string } = {}, requestOptions: any = {}): Observable<any> {
    const params: HttpParams = this.generateUrlParams(urlParams);
    requestOptions = this.generateRequestOptions(requestOptions);
    requestOptions.params = params;
    return this.http.patch(url, data, requestOptions).pipe(take(1));
  }

  public delete(url: string, urlParams: { [param: string]: string } = {}, requestOptions: any = {}): Observable<any> {
    const params: HttpParams = this.generateUrlParams(urlParams);
    requestOptions = this.generateRequestOptions(requestOptions);
    requestOptions.params = params;
    return this.http.delete(url, requestOptions).pipe(take(1));
  }
}
