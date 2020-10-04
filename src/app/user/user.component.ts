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
			this.getRepos(this.user.repos_url);
		}, error => {
			console.log("GRAVE ERROR", error);
		});
	}

	getRepos(url: string){
		this.appService.getReposList(url).subscribe(repos => {
			this.user.reposList = repos;
			this.getFollowers(this.user.followers_url);
		});
	}

	getFollowers(url: string){
		this.appService.getFollowersList(url).subscribe(followers => {
			this.user.followersList = followers;
			this.pageLoaded = true;
		});
	}
}
