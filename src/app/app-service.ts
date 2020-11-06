import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable()
export class AppService {
    constructor(private http: HttpClient) { }
    url = "https://mindler-dashboard.s3.us-east-2.amazonaws.com/products.json";
    getproductData() {
        return this.http.get(this.url)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
                console.error(
                    `Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`);
            }
            return throwError(
                'Something bad happened; please try again later.');
        }
}
