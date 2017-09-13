import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class HttpClient {

    constructor(private http: Http) { }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', "85df68c9-cc1d-4019-8c56-c12630b2c79c");
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