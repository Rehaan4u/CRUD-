import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {userData} from '../interfaces/userData.interface'
import {Observable} from 'rxjs'
import {catchError, map} from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})
export class dbFetchedData {
    private apiUrl = 'https://crud-5f89d-default-rtdb.firebaseio.com'
    constructor(private http: HttpClient) {}

    getUserData(): Observable<userData[]> {
        return this.http.get<userData[] | {[key: string] : userData}> (`${this.apiUrl}/users.json`).pipe(
            map((response) => {
                if(response instanceof Array) {
                    return response;
                } else {
                    return Object.values(response);
                }
            }),
            catchError((error) => {
                console.error('Error fetching user data:', error);
                throw error;
            })
        );
    }
}