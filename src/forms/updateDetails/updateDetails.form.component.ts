import { Component} from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { userData } from '../../interfaces/userData.interface'   
import { userDetails } from '../../services/userData.service'

@Component({
    selector: 'app-updateDetails-form',
    templateUrl: './updateDetails.form.component.html',
    styleUrls: ['./updateDetails.form.component.css']
})

export class updateDetailsForm {

    //very important the service returns the userData or undefined, therefore the variable
    //that carries the value (currUserDetails) should also be of type userData or undefined, 
    // otherwise it will throw an error.
    constructor(public currUserDetails:userData | undefined, public userService:userDetails){}

    updateDetailsForm=new FormGroup({
        name: new FormControl(),
        avatar: new FormControl(),
        brief: new FormControl(),
        passwd: new FormControl()
    })

    fetchUserDetails(name:string){
        this.currUserDetails = this.userService.getUserDatabyName(name);
    }
}