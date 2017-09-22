import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpClient {
    private url: string;
    private dev = true;

    private loginEndpoint = "login";
    private logoutEndpoint = "logout";

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

    getAll(endpoint: String) {
        return this.get(endpoint);
    }

    getByName(endpoint: String, name: String) {
        let nameParameter = "?name=" + name;
        return this.get(endpoint + nameParameter);
    }

    getById(endpoint: String, id: Number) {
        let idParameter = "?id=" + id;
        return this.get(endpoint + idParameter);
    }

    get(endpoint) {
        let url = this.url + endpoint;
        let headers = new Headers();

        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    getWithParameters(endpoint, parameters) {
        let url = this.url + endpoint;
        let headers = new Headers();

        let params = new URLSearchParams();
        for (let key in parameters) {
            params.set(key, parameters[key])
        }

        url += "?" + params.toString();

        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    post(endpoint, data) {
        let url = this.url + endpoint;
        let headers = new Headers();

        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }

    postWithParameters(endpoint, parameters) {
        let url = this.url + endpoint;
        let headers = new Headers();

        let params = new URLSearchParams();
        for (let key in parameters) {
            params.set(key, parameters[key])
        }

        url += "?" + params.toString();

        this.createAuthorizationHeader(headers);
        return this.http.post(url, {}, {
            headers: headers
        });
    }

    deleteById(endpoint: String, id: Number) {
        let idParameter = "?id=" + id;
        return this.delete(endpoint + idParameter);
    }

    delete(endpoint) {
        let url = this.url + endpoint;
        let headers = new Headers();

        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });

    }

    deleteWithParameters(endpoint, parameters) {
        let url = this.url + endpoint;
        let headers = new Headers();

        let params = new URLSearchParams();
        for (let key in parameters) {
            params.set(key, parameters[key])
        }

        url += "?" + params.toString();

        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });
    }

    login(username: string, password: string) {
        let urlAndEndpoint = this.url + this.loginEndpoint;
        return this.http.post(urlAndEndpoint, JSON.stringify({ username: username, password: password }));
    }

    logout() {
        let urlAndEndpoint = this.url + this.logoutEndpoint;
        let headers = new Headers();

        this.createAuthorizationHeader(headers);
        return this.http.post(urlAndEndpoint, {}, {
            headers: headers
        });
    }
}