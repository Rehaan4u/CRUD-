import { Component, OnInit} from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { userData } from '../../interfaces/userData.interface'   
import { userDetails } from '../../services/userData.service'
import {ActivatedRoute} from '@angular/router'
//We import router to redirec tthe user to the home page, after he cliucks the submit button 
//in the form, and the form is submitted successfully.
import { Router } from '@angular/router'


@Component({
    selector: 'app-updateDetails-form',
    templateUrl: './updateDetails.form.component.html',
    styleUrls: ['./updateDetails.forms.component.css']
})

export class updateDetailsForm {

    //very important the service returns the userData or undefined, therefore the variable
    //that carries the value (currUserDetails) should also be of type userData or undefined, 
    // otherwise it will throw an error.

    currUserDetails:userData | undefined;
    constructor(
        public userService:userDetails,
        private routePath: ActivatedRoute,
        public router: Router
    ){}

    updateDetailsForm=new FormGroup({
        name: new FormControl(''),
        avatar: new FormControl(''),
        brief: new FormControl(''),
        passwd: new FormControl('')
    })

    ngOnInit(): void {
        const name = this.routePath.snapshot.paramMap.get('name');
        if(name){
            this.currUserDetails=this.userService.getUserDatabyName(name);
            //very very important to use this for using any varibale declared in this class, 
            // otherwise it will throw an error.
            this.updateDetailsForm.patchValue({
                name: this.currUserDetails?.name,
                avatar: this.currUserDetails?.avatar,
                brief: this.currUserDetails?.brief,
            })
        }
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
            this.router.navigate(['/']);
        }else {
            alert('Incorrect password');
        }
    }
}