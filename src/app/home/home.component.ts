import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AppService } from '../app.service';
import { FilterPipe } from './filter.pipe';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { }

	users:any = [];
	nextUrl:string;
	search: string;
	pageLoaded:boolean = false;

	scrollQuerying:boolean = false;
	currentPos: number = 0;

	ngOnInit(): void {
		this.getUsers();
		this.goToTop();
		// this.pageLoaded = true;
	}

	@HostListener("window:scroll", [])
	onWindowScroll() {
		/*console.log("Document: " + window.document.body.offsetHeight);
		console.log("Current: " + window.innerHeight + "\tScroll: " + window.scrollY);
		console.log("Total: " + (window.innerHeight + window.scrollY));*/
		if(this.currentPos < window.innerHeight + window.scrollY && !this.scrollQuerying){
			if((window.innerHeight + window.scrollY) >= (window.document.body.offsetHeight-100)){
				// window.alert("Call function here");
				this.currentPos = window.innerHeight + window.scrollY;
				this.scrollQuerying = true;
				this.getUsers();
			}
		}
	}

	getUsers(){
		this.appService.getUsers(this.nextUrl).subscribe(
			users => {
				this.users = this.users.concat(users.data);
				this.nextUrl = users.next;
				this.pageLoaded = true;
				this.scrollQuerying = false;
			},
			error => {
				console.error(error)
				this.router.navigate(['error'], {state: {data: JSON.stringify(error)}});
			}
		);
	}

	viewUser(login:string){
		this.router.navigate(['', login], {relativeTo: this.route});
	}

	goToTop(){
		document.body.scrollTop = document.documentElement.scrollTop = 20;
	}
}
