import { Injectable } from '@angular/core';
import { HttpClient } from '../../HttpAuthTokenInterceptor.service';

@Injectable()
export class CreateEntityService {
  private url: string;
  private dev = true;


  constructor(private http: HttpClient) {
    if (this.dev) {
      this.url = "http://localhost:8080/multi_archive/";
    } else {
      this.url = window.location.origin + "/multi_archive/";
    }
  }

  post(caller, data) {
    return this.http.post(this.url + caller, data);
  }
}
