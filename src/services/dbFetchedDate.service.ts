import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {userData} from '../interfaces/userData.interface'
import {Observable, BehaviorSubject} from 'rxjs'
import {catchError, map, switchMap} from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})
export class dbFetchedData {

        public trigger$ = new BehaviorSubject<number>(0)

        public user$: Observable<userData[]>= this.trigger$.pipe(switchMap(() => {
            return this.getUserData()
        }))

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
    //Created the method that would trigger the trigger$ by calling the next on it 
    public refresh():void {
        console.log(`The value of trigger currently is: ${this.trigger$.value}`)
        this.trigger$.next(this.trigger$.value+1);
        console.log(`The value of trigger changed to: ${this.trigger$.value}`)
    } 

    ngOnChange(): void {
        this.getUserData()
    }
}