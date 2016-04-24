import {Injectable} from 'angular2/core';
import {Http, Response, Headers } from 'angular2/http';
import { Observable } from "rxjs/";
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

	ContactURI: string = "https://kontakt.stamplayapp.com/api/cobject/v1/contact";
	Contacts: Array<Object>;

	constructor(public http: Http) { }



	// Set the content-type for requests with a body, add a 3rd param to http method call
	defaultHeaders() {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return { headers: headers };
	}





	getContacts(): Observable<any> {
		return this.http.get(this.ContactURI)
			.map((res: Response) => res.json().data);
	}

// Adds Contact from the data passed in
	addContact(contact): Observable<any> {
		var body = JSON.stringify(contact);
		return this.http.post(this.ContactURI, body, this.defaultHeaders())
			.map((res: Response) => res.json())
	}

// Updates the contact at the ContactURI/[Id Of The Contact]
	updateContact(contact): Observable<any> {
		var body = JSON.stringify({ name: contact.name, number: contact.number });
		return this.http.put(`${this.ContactURI}/${contact._id}`, body, this.defaultHeaders())
			.map((res: Response) => res.json())
	}

	// Updates the contact at the ContactURI/[Id Of The Contact]
	deleteContact(id): Observable<any> {
		return this.http.delete(`${this.ContactURI}/${id}`)
			.map((res: Response) => res.json())
	}
}

