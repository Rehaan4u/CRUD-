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
        name: new FormControl(this.currUserDetails?.name),
        avatar: new FormControl(this.currUserDetails?.avatar),
        brief: new FormControl(this.currUserDetails?.brief),
        passwd: new FormControl()
    })

    fetchUserDetails(name:string){
        this.currUserDetails = this.userService.getUserDatabyName(name);
    }

    updateDetails(){
        //I have set the condition where the user can only update his details if he enters the 
        // correct password,
        // otherwise the details will not be updated.
        if(this.updateDetailsForm.get('passwd')?.value===this.currUserDetails?.passwd){
            //.get() method is used to access the data user enter in form controls in the form group.
            this.currUserDetails!.name=this.updateDetailsForm.get('name')?.value;
            this.currUserDetails!.avatar=this.updateDetailsForm.get('avatar')?.value;
            this.currUserDetails!.brief=this.updateDetailsForm.get('brief')?.value;
        }
    }
}