import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { FilterPipe } from './filter.pipe';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { }

	users:any = []
	sinceLast:number = 0;
	search: string;
	pageLoaded:boolean = false;

	scrollQuerying:boolean = false;
	currentPos: number = 0;

	ngOnInit(): void {
		this.getUsers();
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
		let params = {since: this.sinceLast}
		this.appService.getUsers(params).subscribe(users => {
			this.users = this.users.concat(users);
			console.log("Users", this.users);
			this.sinceLast = this.users[this.users.length-1].id;
			this.pageLoaded = true;
			this.scrollQuerying = false;
		});
	}

	viewUser(login:string){
		this.router.navigate(['', login], {relativeTo: this.route});
	}

	goToTop(){
		document.body.scrollTop = document.documentElement.scrollTop = 20;
	}
}
