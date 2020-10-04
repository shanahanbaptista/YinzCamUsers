import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AppService {

	constructor(private http: HttpClient) { }

	rootURL = 'https://api.github.com/users';
	//Additional params ?since=<page_number>
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
		observe: 'response' as 'response'
	};

	getUsers(url): Observable<any> {
		let reqUrl = url || this.rootURL;
		return this.http.get(reqUrl, {observe: 'response'}).pipe(
			map(res=>{
				let link = res.headers.get('link');
				let next = link.substring(link.indexOf('<')+1, link.indexOf('>'));
				return {next: next, data:res.body};
			}),
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
		return this.http.get<any>(url, {observe: 'response'}).pipe(
			map(res=>{
				return {pagination: this.getPaginationUrls(res), data:res.body};
			}),
			catchError(this.handleError<any>(`getReposList url=${url}`))
		);
	}

	getFollowersList(url: string): Observable<any> {
		return this.http.get<any>(url, {observe: 'response'}).pipe(
			map(res=>{
				return {pagination: this.getPaginationUrls(res), data:res.body};
			}),
			catchError(this.handleError<any>(`getFollowersList url=${url}`))
		);
	}

	private getPaginationUrls(res){
		let link = res.headers.get('link');
		link = link.split(',')
		let urls = {}

		link.forEach((value, key) => {
			let url = value.substring(value.indexOf('<')+1, value.indexOf('>'));
			let type = value.substring(value.indexOf('rel=')+5, value.length-1);
			urls[type] = url;
		});

		return urls;
	}

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			// return of(result as T);
			return throwError(error);
		};
	}
}
