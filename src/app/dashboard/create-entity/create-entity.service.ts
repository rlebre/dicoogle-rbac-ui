import { Injectable } from '@angular/core';
import { HttpClient } from '../../HttpAuthTokenInterceptor.service';
import { Observable } from 'rxjs/Observable';

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

  post(apiEndpoint, data) {
    return this.http.post(this.url + apiEndpoint, data);
  }
}
