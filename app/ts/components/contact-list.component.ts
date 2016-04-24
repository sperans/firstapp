import { Component, Input } from "angular2/core";
import { ContactService } from "../services/contact.service";
import { ContactComponent } from "./contact.component";
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from "angular2/common";

@Component({
  selector: "contact-list",
  template: `
  <br>
    <contact *ngFor="#contact of contacts; #i = index"
             [contacts]="contacts"
             [details]="contact"
             [idx]="i"></contact>
    <div>
      <form (ngSubmit)="addContact(contact)">
        <div>Add New</div>
        <div>
          <input type="text" [(ngModel)]="contact.name" />
        </div>
        <div>
          <input type="text" [(ngModel)]="contact.number" />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  `,
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ContactComponent]
})


export class ContactListComponent {
  @Input() contacts: Array<any>;

  contact: Object;

  constructor(public contactService: ContactService) {
    this.contact = {};
  }

  addContact(contact) {
    if (contact.name === "" || contact.number === "") return false;
    this.contactService.addContact(this.contact)
      .subscribe(
      result => this.contacts.push(result),
      error => console.error(error),
      () => this.contact = {}
      )
  }


}