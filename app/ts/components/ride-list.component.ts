import { Component, Input } from "angular2/core";
import { RideService } from "../services/ride.service";
import { RideComponent } from "./ride.component";
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from "angular2/common";

@Component({
  selector: "ride-list",
  template: `
  <br>
    <ride *ngFor="#ride of rides; #i = index"
             [rides]="rides"
             [details]="ride"
             [idx]="i"></ride>
    <div>
      <form (ngSubmit)="addRide(ride)">
        <div>Add New Ride!</div>
        <br>
        <div>
          From:<input type="text" [(ngModel)]="ride.startLocation" />
        </div>
        <div>
          To:<input type="text" [(ngModel)]="ride.endLocation" />
        </div>
        <div>
          Price:<input type="number" [(ngModel)]="ride.price" />
        </div>
        <div>
          Seats:<input type="number" [(ngModel)]="ride.seats" />
        </div>
        <div>
          Date:<input type="datetime-local" [(ngModel)]="ride.startDate" />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, RideComponent]
})


export class RideListComponent {
  @Input() rides: Array<any>;

  ride: Object;

  constructor(public rideService: RideService) {
    this.ride = {};
  }

  addRide(ride) {
    if (ride.startLocation === "" || ride.endLocation === "") return false;
    this.rideService.addRide(this.ride)
      .subscribe(
      result => this.rides.push(result),
      error => console.error(error),
      () => this.ride = {}
      )
  }


}