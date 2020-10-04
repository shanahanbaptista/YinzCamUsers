import { Component, OnInit } from '@angular/core';
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
	ngOnInit(): void {
		const name = this.route.snapshot.paramMap.get('name');
		this.getUserByName(name);
	}

	getUserByName(name: string):void {
		this.appService.getUserByName(name).subscribe(user => {
			console.log(user);
			this.user = user;
			this.user.reposList = [];
			this.user.followersList = [];
			this.pageLoaded = true;
		}, error => {
			console.log("GRAVE ERROR", error);
		});
	}

	getRepos(url: string){
		this.appService.getReposList(url).subscribe(repos => {
			this.user.reposList = repos.data;
			this.user.pagination = repos.pagination;
			this.display = 'repos';
		});
	}

	getFollowers(url: string){
		this.appService.getFollowersList(url).subscribe(followers => {
			this.user.followersList = followers.data;
			this.user.pagination = followers.pagination;
			this.display = 'followers';
		});
	}

	goToTop(){
		document.body.scrollTop = document.documentElement.scrollTop = 20;
	}
}
