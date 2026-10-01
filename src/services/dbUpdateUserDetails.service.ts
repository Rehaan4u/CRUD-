import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError } from 'rxjs'
import { tap } from 'rxjs/operators'
import { userData } from '../interfaces/userData.interface'
import { dbFetchedData } from './dbFetchedDate.service'


@Injectable ({
    providedIn: 'root'
})
export class dbUpdateUserDetails {

    public apiUrl="http://localhost:8080"

    constructor(
        private http:HttpClient,
        private dbFetchedData:dbFetchedData
    ) {}

    //Changes the put call to the Patch Call
    dbPutUserDetails(userObj: userData | undefined, idx: number): Observable<userData> {
         return this.http.patch<userData>(`${this.apiUrl}/users/${idx}`, userObj).pipe(
            tap(()=>this.dbFetchedData.refresh()),
            tap(()=>console.log(`PUT call was made succesfully`)),
            catchError( (error) => {
                console.error(`Data couldn't be updated`,error)
                throw error
            })
        )
    }
}