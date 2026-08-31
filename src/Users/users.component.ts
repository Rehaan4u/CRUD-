//We are importing the Input from the angualr/core
import { Component, EventEmitter, Input, Output} from '@angular/core'
// import { DUMMY_USERS } from './dummyUsers'
import { signal, computed} from '@angular/core'
import { input } from '@angular/core'
import { userDetails } from '../services/userDetails.service';

 

@Component({
    selector: 'app-user' ,
    templateUrl: './users.component.html',
    styleUrl: './users.component.css' ,
    standalone: true
})

export class Users { 
    //fro using the service, you instantiate the object of the service class
    //by declaring a variable of type, of the service class inside the constructor, and always 
    //use the public/private/protected to use "this"
    constructor(public userDetails: userDetails) {}
    /*
        We use {required :true}, because here we have declared
        avatar with an "!", so what required does, if the devloepr forgets
        to bind the [avatar] with a value then compiler will throw error
    */
    @Input({required: true}) avatar!:string;
    @Input({required: true}) name!: string;
    @Input({required:true}) id!: string;
    //You declare an object for the output
    @Output() select =new EventEmitter();

    // avatar=input.required<string>();
    // name=input.required<string>();

    // imagePath=computed(() => {return '../assets/Users/' + this.avatar()})

    get imagePath() { 
        return '../assets/Users/' + this.avatar
    }
    onSelectUser () {
        this.select.emit(this.id)
    }
}