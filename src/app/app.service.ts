import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AppService {

	constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

	rootURL = 'https://api.github.com/users';
	//Additional params ?since=<page_number>
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	getUsers(params): Observable<any> {
		return this.http.get<any[]>(this.rootURL, {params: params})
			.pipe(
				catchError(this.handleError<any>('getUsers', []))
			);
	}

	getUserByName(name: String): Observable<any> {
		const url = `${this.rootURL}/${name}`;
		return this.http.get<any>(url).pipe(
			catchError(this.handleError<any>(`getUserByName name=${name}`))
		);
	}

	getReposList(url: string): Observable<any> {
		return this.http.get<any>(url).pipe(
			catchError(this.handleError<any>(`getReposList url=${url}`))
		);
	}

	getFollowersList(url: string): Observable<any> {
		return this.http.get<any>(url).pipe(
			catchError(this.handleError<any>(`getFollowersList url=${url}`))
		);
	}

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.router.navigate(['error'], error);

			return of(result as T);
		};
	}
}
