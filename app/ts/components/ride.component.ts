import { Component, Input } from "angular2/core";
import { RideService} from "../services/ride.service";
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from "angular2/common";




@Component({
	selector: "ride",
	template: `
  <div [ngSwitch]="editing._id">
    <div *ngSwitchDefault>
      <div>From : {{ details.startLocation }}</div>
      <div>To : {{ details.endLocation }}</div>
      <div>Price : {{ details.price }}€</div>
      <div>Seats : {{ details.seats }}</div>
      <div>Date : {{ details.startDate }}</div>
      <div>Date : {{ details.owner }}</div>
      <button (click)="toggleEdit(details)">Edit</button>
      <button (click)="deleteRide(details._id, idx)">Delete</button>
    </div>
    <div *ngSwitchWhen="details._id">
      <form (ngSubmit)="editRide()">
        <div>
          <input type="text" [(ngModel)]="editing.startLocation" />
        </div>
        <div>
          <input type="text" [(ngModel)]="editing.endLocation" />
        </div>
        <div>
          <input type="text" [(ngModel)]="editing.price" />
        </div>
        <div>
          <input type="text" [(ngModel)]="editing.seats" />
        </div>
        <div>
          <input type="text" [(ngModel)]="editing.startDate" />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button (click)="cancelEdit($event)">Cancel</button>
        </div>
      </form>
    </div>
    <br>
  </div>`,
	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})





export class RideComponent {
	@Input() rides: Array<any>;
	@Input() details;
	@Input() idx: number;

	editing: Object;

	constructor(public rideService: RideService) {
		this.editing = {};
	}

	toggleEdit(details) {
		this.editing = details;
	}

	cancelEdit(e) {
		e.preventDefault();
		this.editing = {}
	}

	editRide() {
		this.rideService.updateRide(this.editing)
			.subscribe(
			result => this.details = result,
			error => console.log(error),
			() => this.editing = {}
			)
	}

	deleteRide(id, idx) {
		this.rideService.deleteRide(id)
			.subscribe(
			result => this.rides.splice(idx, 1),
			error => console.log(error),
			() => this.editing = {}
			)
	}
}