import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, catchError} from 'rxjs'
import {userData} from '../interfaces/userData.interface'
import {tap} from 'rxjs/operators'
import { dbFetchedData } from './dbFetchedDate.service'


@Injectable ({
    providedIn: 'root'
})
export class dbUpdateUserDetails {

    public apiUrl="https://crud-5f89d-default-rtdb.firebaseio.com"

    constructor(
        private http:HttpClient,
        private dbFetchedData:dbFetchedData
    ) {}

    dbPutUserDetails(userObj: userData | undefined, idx: number): Observable<userData> {
         return this.http.put<userData>(`${this.apiUrl}/users/${idx-1}.json`, userObj).pipe(
            tap(()=>this.dbFetchedData.refresh()),
            tap(()=>console.log(`PUT call was made succesfully`)),
            catchError( (error) => {
                console.error(`Data couldn't be updated`,error)
                throw error
            })
        )
    }
}