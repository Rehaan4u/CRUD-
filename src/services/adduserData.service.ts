import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { userData } from '../interfaces/userData.interface'


@Injectable({
    providedIn:'root'
})
export class addUserData {

    constructor(private http:HttpClient){}

    private apiUrl = 'http://localhost:8080/users'


    //here in the method the Observable and post have types of <userData> cause that is what they would be 
    //getting back from the server, we would have to change to type what server responds back
    postDataIntoDB(input: userData):Observable<userData>{
        console.log(`Going to start makign the POST call`);
        return this.http.post<userData>(`${this.apiUrl}/adduser`, input)
    }
}