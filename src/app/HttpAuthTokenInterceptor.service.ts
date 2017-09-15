import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class HttpClient {
    private url: string;
    private dev = true;

    constructor(private http: Http) {
        if (this.dev) {
            this.url = "http://localhost:8080/multi_archive/";
        } else {
            this.url = window.location.origin + "/multi_archive/";
        }
    }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', localStorage.getItem('currentUser'));
    }

    get(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }

    delete(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });

    }
}