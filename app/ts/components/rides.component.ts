import {Component} from 'angular2/core';
import {RideListComponent} from "./ride-list.component";
import {RideService} from "../services/ride.service";

@Component({
    selector: 'my-rides',
    template: `
    <ride-list [rides]="rides"></ride-list>
    `,
    directives: [RideListComponent]

})
export class RidesComponent implements OnInit {

	rides: Array<Object>;

	constructor(rideService: RideService) {
		this.rides = [];
		rideService.getRides()
			.subscribe(
			result => this.rides = result,
			err => console.error(err),
			() => console.log(this.rides)
			)
	}

}