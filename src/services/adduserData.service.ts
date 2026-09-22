import {Injectable} from '@angular/core'
import {userData} from '../interfaces/userData.interface'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {catchError} from 'rxjs/operators'


@Injectable({
    providedIn:'root'
})
export class addUserData {

    constructor(private http:HttpClient){}

    private apiUrl = 'https://crud-5f89d-default-rtdb.firebaseio.com'


    postDataIntoDB(input: userData):Observable<userData>{
        return this.http.post<userData>(`${this.apiUrl}/users.json`, input)
    }
}