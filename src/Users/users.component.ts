import {Input,Component,Output, EventEmitter} from '@angular/core';
import {userData} from '../interfaces/userData.interface';



@Component({
    selector: 'app-user' ,
    templateUrl: './users.component.html' ,
    styleUrls: ['./users.component.css'] ,
})

export class Users {
    @Input() reqUser!: userData | undefined;
    @Output() onClickUserData= new EventEmitter()

    updateClicked() {
        //here with reqUSer I have used ?(optional chaining operatoar) to check if reqUser is 
        // not undefined before accessing its name property. 
        //This prevents runtime errors in case reqUser is undefined.
        this.onClickUserData.emit(this.reqUser?.name);
    }
}

