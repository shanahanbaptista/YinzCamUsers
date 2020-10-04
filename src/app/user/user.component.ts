import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	constructor(private appService: AppService, private route: ActivatedRoute) { }

	pageLoaded:boolean = false;
	user:any = {};

	display:string;

	scrollQuerying:boolean = false;
	currentPos: number = 0;
	ngOnInit(): void {
		const name = this.route.snapshot.paramMap.get('name');
		this.getUserByName(name);
	}

	@HostListener("window:scroll", [])
	onWindowScroll() {
		if(this.display && this.currentPos < window.innerHeight + window.scrollY && !this.scrollQuerying){
			if((window.innerHeight + window.scrollY) >= (window.document.body.offsetHeight-100)){
				this.currentPos = window.innerHeight + window.scrollY;
				this.scrollQuerying = true;
				if(this.display == 'repos'){
					console.log("Gettong repos")
					this.getRepos(this.user.repos_url);
				}
				else if(this.display == 'followers')
					this.getFollowers(this.user.followers_url);
			}
		}
	}

	getUserByName(name: string):void {
		this.appService.getUserByName(name).subscribe(user => {
			console.log(user);
			this.user = user;
			this.user.reposList = [];
			this.user.followersList = [];
			this.pageLoaded = true;
			//this.getRepos(this.user.repos_url);
		}, error => {
			console.log("GRAVE ERROR", error);
		});
	}

	getRepos(url: string){
		this.appService.getReposList(url).subscribe(repos => {
			this.user.reposList = this.user.reposList.concat(repos.data);
			this.user.repos_url = repos.next;
			//this.getFollowers(this.user.followers_url);
			this.scrollQuerying = false;
		});
	}

	getFollowers(url: string){
		this.appService.getFollowersList(url).subscribe(followers => {
			this.user.followersList = this.user.followersList.concat(followers.data);
			this.user.followers_url = followers.next;
			
			this.scrollQuerying = false;
		});
	}

	goToTop(){
		document.body.scrollTop = document.documentElement.scrollTop = 20;
	}
}
