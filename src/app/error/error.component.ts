import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  sub:any;
  ngOnInit() {
    /*this.sub = this.route.
    	data.
      .subscribe(v => console.log(v));*/
      console.log(this.router.getCurrentNavigation());
  }

}
