import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap } from "rxjs";
import { userData } from "../interfaces/userData.interface";
import { dbFetchedData } from "./dbFetchedDate.service";

@Injectable({
    providedIn:'root'
})
export class permanentDeleteUser
{
    public apiUrl='http://localhost:8080/users';
    constructor(
        public http:HttpClient,
        private dbFetchedData: dbFetchedData
    ){}

    deleteUser(userId: string):Observable<userData>
    {
        const headers=new HttpHeaders({"Which-User": userId});
        return this.http.delete<userData>(`${this.apiUrl}/deleteUser`, {headers}).pipe(
            tap(()=> this.dbFetchedData.refresh()),
            catchError((error) => {
                console.error(`DELETE call failed`);
                throw error;
            })
        )
    }
};