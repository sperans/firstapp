import { Component, Input } from "angular2/core";
import { ContactService} from "../services/contact.service";
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from "angular2/common";




@Component({
	selector: "contact",
	template: `
  <div [ngSwitch]="editing._id">
    <div *ngSwitchDefault>
      <div>name : {{ details.name }}</div>
      <div>number : {{ details.number }}</div>
      <button (click)="toggleEdit(details)">Edit</button>
      <button (click)="deleteContact(details._id, idx)">Delete</button>
    </div>
    <div *ngSwitchWhen="details._id">
      <form (ngSubmit)="editContact()">
        <div>
          <input type="text" [(ngModel)]="editing.name" />
        </div>
        <div>
          <input type="text" [(ngModel)]="editing.number" />
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





export class ContactComponent {
	@Input() contacts: Array<any>;
	@Input() details;
	@Input() idx: number;

	editing: Object;

	constructor(public contactService: ContactService) {
		this.editing = {};
	}

	toggleEdit(details) {
		this.editing = details;
	}

	cancelEdit(e) {
		e.preventDefault();
		this.editing = {}
	}

	editContact() {
		this.contactService.updateContact(this.editing)
			.subscribe(
			result => this.details = result,
			error => console.log(error),
			() => this.editing = {}
			)
	}

	deleteContact(id, idx) {
		this.contactService.deleteContact(id)
			.subscribe(
			result => this.contacts.splice(idx, 1),
			error => console.log(error),
			() => this.editing = {}
			)
	}
}
