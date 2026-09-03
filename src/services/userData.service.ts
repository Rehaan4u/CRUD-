import {Injectable} from '@angular/core'
import {DUMMY_USERS} from '../Users/dummyUsers'
import {userData} from '../interfaces/userData.interface'
import { NumberFormatStyle } from '@angular/common';

@Injectable({
    providedIn:'root'
})

export class userDetails {
    public userData: userData[]=DUMMY_USERS;

    getUserData(id:number): userData | undefined {
        return this.userData.find(curr=>curr.id===id);
    }

    getUserDatabyName(name:string): userData | undefined {
        return this.userData.find(curr=>curr.name===name);
    }

}