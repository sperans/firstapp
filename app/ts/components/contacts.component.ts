import {Component} from 'angular2/core';
import {ContactListComponent} from "./contact-list.component";
import {ContactService} from "../services/contact.service";

@Component({
    selector: 'my-contacts',
    template: `
    <contact-list [contacts]="contacts"></contact-list>
    `,
    directives : [ContactListComponent]

})
export class ContactsComponent implements OnInit { 
	
	contacts: Array<Object>;

	constructor(contactService : ContactService) {
		this.contacts = [];
		contactService.getContacts()
		.subscribe(
			result => this.contacts = result,
			err => console.error(err),
			() => console.log(this.contacts)
			)
	}

}