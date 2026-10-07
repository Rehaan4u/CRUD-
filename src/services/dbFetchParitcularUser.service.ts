//(make a function to make the get call) -> ()
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError } from 'rxjs'
import { delay } from 'rxjs/operators'
import { userData } from '../interfaces/userData.interface'

@Injectable({
    providedIn: 'root'
})
export class dbFetchParticularUser {

    public apiUrl= "http://localhost:8080/users"
    public fullViewUrl="http://localhost:8080/users/fullView"

    constructor(
        private http: HttpClient
    ) {}

    dbUserDataByID(id: number): Observable<userData> {
        return this.http.get<userData>(`${this.apiUrl}/${id}`).pipe(
            catchError((error) => {
                console.error(`The call for fetching data for the user with id: ${id} was not successfull`)
                throw error
            })
        )
    }
    fullViewByID(id: number): Observable<userData> {
        return this.http.get<userData>(`${this.fullViewUrl}/${id}`).pipe(
            delay(3000),
            catchError((error) => {
                console.error(`The call for fetching data for the user with id: ${id} was not successfull`)
                throw error;
            })
        )
    }

}
