import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router) { }
	errors:any = {};

	status:number;
	message: string;
	ngOnInit() {
		if(window.history.state.data)
			this.errors = JSON.parse(window.history.state.data);
		console.log(this.errors);
		this.status = this.errors.status || 404;
		this.message = this.errors.message || 'Oops, something went wrong';
	}
}
