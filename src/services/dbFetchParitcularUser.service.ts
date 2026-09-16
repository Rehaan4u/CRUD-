//(make a function to make the get call) -> ()
import {Injectable} from '@angular/core'
import {Observable ,catchError} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {userData} from '../interfaces/userData.interface'

@Injectable({
    providedIn: 'root'
})
export class dbFetchParticularUser {

    public apiUrl= "https://crud-5f89d-default-rtdb.firebaseio.com"

    constructor(
        private http: HttpClient
    ) {}

    dbUserDataByID(id: number): Observable<userData> {
        return this.http.get<userData>(`${this.apiUrl}/users/${id-1}.json`).pipe(
            catchError((error) => {
                console.error(`The call for fetching data fro the user with id: ${id} was not successfull`)
                throw error
            })
        )
    }

}
