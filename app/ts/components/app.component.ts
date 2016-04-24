import {Component} from 'angular2/core';
import {ContactsComponent} from "./contacts.component";
import {RidesComponent} from "./rides.component";
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {ContactService} from "../services/contact.service";
import {RideService} from "../services/ride.service";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'firstapp',

    template: `
    <h1>{{title}}</h1>
    <nav>
    <a [routerLink]="['Contacts']">Contacts</a>
    <a [routerLink]="['Rides']">Rides</a>
    <a [routerLink]="['Login']">Login</a>
    <a [routerLink]="['Register']">Register</a>
    </nav>
    <router-outlet></router-outlet>
    `,
    
    directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS, ContactService, RideService],

})


@RouteConfig([


{
	path: '/contacts',
	name: 'Contacts',
	component: ContactsComponent,
	useAsDefault: true
},

{
	path: '/rides',
	name: 'Rides',
	component: RidesComponent,
	useAsDefault: false
},

{
	path: '/login',
	name: 'Login',
	component: LoginComponent,
},

{
	path: '/register',
	name: 'Register',
	component: RegisterComponent,
}


	])



export class AppComponent { 
	
	title = "My First Angular 2 App with CRUD and maybe AUTH";

}