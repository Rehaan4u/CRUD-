import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, tap } from 'rxjs'
import { userData } from '../interfaces/userData.interface'
import { dbFetchedData } from './dbFetchedDate.service'

@Injectable({
    providedIn:'root'
})
export class addUserData {

    constructor(
        private http:HttpClient,
        public triggerNewUser:dbFetchedData
    ){}

    private apiUrl = 'http://localhost:8080/users'


    //here in the method the Observable and post have types of <userData> cause that is what they would be 
    //getting back from the server, we would have to change to type what server responds back
    postDataIntoDB(input: userData, passwd: string):Observable<userData>{
        const headers= new HttpHeaders({'Admin-Passwd':passwd});
        console.log(`Going to start making the POST call`);
        console.log('Value of heders is ', headers);
        return this.http.post<userData>(`${this.apiUrl}/adduser`, input, {headers}).pipe(
            tap(()=>this.triggerNewUser.refresh()),
            catchError((error)=>{
                console.error(`The error occured while making the POST call`);
                throw error;
            })
        );
    }
}