import {Input,Component} from '@angular/core';
import {userData} from '../interfaces/userData.interface';

@Component({
    selector: 'app-user' ,
    templateUrl: './users.component.html' ,
    styleUrls: ['./users.component.css'] ,
})

export class Users {
    @Input() reqUser: userData | undefined;

}

