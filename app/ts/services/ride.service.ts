import {Injectable} from 'angular2/core';
import {Http, Response, Headers } from 'angular2/http';
import { Observable } from "rxjs/";
import 'rxjs/add/operator/map';

@Injectable()
export class RideService {

	RideURI: string = "https://kontakt.stamplayapp.com/api/cobject/v1/ride";
	Rides: Array<Object>;

	constructor(public http: Http) { }



	// Set the content-type for requests with a body, add a 3rd param to http method call
	defaultHeaders() {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return { headers: headers };
	}





	getRides(): Observable<any> {
		return this.http.get(this.RideURI)
			.map((res: Response) => res.json().data);
	}

// Adds Contact from the data passed in
	addRide(ride): Observable<any> {
		var body = JSON.stringify(ride);
		return this.http.post(this.RideURI, body, this.defaultHeaders())
			.map((res: Response) => res.json())
	}

// Updates the contact at the ContactURI/[Id Of The Contact]
	updateRide(ride): Observable<any> {
		var body = JSON.stringify({ startLocation: ride.startLocation, endLocation: ride.endLocation, price: ride.price, seats: ride.seats, date: ride.date });
		return this.http.put(`${this.RideURI}/${ride._id}`, body, this.defaultHeaders())
			.map((res: Response) => res.json())
	}

	// Updates the contact at the ContactURI/[Id Of The Contact]
	deleteRide(id): Observable<any> {
		return this.http.delete(`${this.RideURI}/${id}`)
			.map((res: Response) => res.json())
	}
}

