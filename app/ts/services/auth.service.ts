import {Injectable} from 'angular2/core';
import {Http, Response, Headers } from 'angular2/http';
import { Observable } from "rxjs/";
import 'rxjs/add/operator/map';
import localStorage from 'localStorage';


@Injectable()

export class AuthService {

	AuthURI: string = "https://kontakt.stamplayapp.com/api/user/v1/users";
	token: string;


	defaultHeaders() {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return { headers: headers };
	}

	constructor() {
		this.token = localStorage.getItem('token');
	}

	loginUser(): Observable<any> {
    return this.http.post(this.AuthURI)
		.map((res: Response) => res.json().data);
        this.token = data.token;
        localStorage.setItem('token', this.token);
      });

	logoutUser(): Observable<any> {
    return this.http.get(this.config.AuthUri) 
	.map((res: Response) => res.json().data);
      this.token = undefined;
      localStorage.removeItem('token');
    });

