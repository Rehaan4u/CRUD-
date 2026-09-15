import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {userData} from '../interfaces/userData.interface'
import {Observable} from 'rxjs'
import {catchError} from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})
export class dbFetchedData {
    private apiUrl = 'https://crud-5f89d-default-rtdb.firebaseio.com'
    constructor(private http: HttpClient) {}

    getUserData(): Observable<userData[]> {
        console.log('Fetching user data from the database...');
        //Two important things to note here:
        //1: ${this.apiUrl}/users is same as 'this.apiUrl + '/users' 
        //2: the.json is important as we are using the firbase here, not mandatory thing for other databases.
        //3: The type we are using for the get method is just fro typeScript checking, its all upto the server
        //to send the data in whatever format it wants, 
        // but we are just telling the typeScript that we are expecting the data in this format.

        return this.http.get<userData[]>(`${this.apiUrl}/users.json`).pipe(catchError((error) => {
            //very important, in the above where you mention the $this.apiUrl
            //its important to `` and not '', there is a difference between the two, the `` is used for template literals and 
            // '' is used for strings.
            console.error('Error fetching user data:', error);
            throw error;
        }));
    }
}