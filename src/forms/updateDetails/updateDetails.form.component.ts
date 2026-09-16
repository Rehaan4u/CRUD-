import { Component, OnInit} from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { userData } from '../../interfaces/userData.interface'   
// import { userDetails } from '../../services/userData.service'
import {ActivatedRoute} from '@angular/router'
//We import router to redirec tthe user to the home page, after he cliucks the submit button 
//in the form, and the form is submitted successfully.
import { Router } from '@angular/router'
import { dbFetchParticularUser } from '../../services/dbFetchParitcularUser.service'
import { dbUpdateUserDetails } from '../../services/dbUpdateUserDetails.service'
import {catchError} from 'rxjs'
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
        // public userService:userDetails,
        private routePath: ActivatedRoute,
        public router: Router,
        public dbFetchParticularUser:dbFetchParticularUser,
        public dbUpdateUserDetails: dbUpdateUserDetails
    ){}

    updateDetailsForm=new FormGroup({
        name: new FormControl(''),
        // avatar: new FormControl(''),
        brief: new FormControl(''),
        passwd: new FormControl('')
    })

    public id = this.routePath.snapshot.paramMap.get('id');

    ngOnInit(): void {
        console.log(`id received is ${this.id}`)
        if(this.id){
            //converts the id stored as string into a number, and stores it in idx variable.
            const idx=+this.id;
            console.log(`idx converted value is ${idx}`)
            this.dbFetchParticularUser.dbUserDataByID(idx).subscribe({

                    next:(response)=> {
                        //the below commented line makes a shallow copy, meaning, it won't point to the original currUserDetails, 
                        // but it will point to a new object with the same properties as currUserDetails.
                        //therfore, any change you make using this, will not get reflected in the original currUserDetails, 
                        // and vice versa.
                        // this.currUserDetails={...response}
                        this.currUserDetails=response
                        console.log(`The value of avatar stored here is ${this.currUserDetails.avatar}`)
                                  this.updateDetailsForm.patchValue({
                                    name:this.currUserDetails?.name,
                                    brief: this.currUserDetails?.brief,
                                })
                    },
                    error: (error) => {
                        console.error(`The value has not been received`, error)
                    },
                    complete: () => {
                        console.log(`The data has been fetched succefully`)
                    }
                    // this.currUserDetails={...response}
                })
            }
   
            //very very important to use this for using any varibale declared in this class, 
            // otherwise it will throw an error.
            // this.updateDetailsForm.patchValue({
            //     name: this.currUserDetails?.name,
            //     avatar: this.currUserDetails?.avatar,
            //     brief: this.currUserDetails?.brief,
            // })

 
        //  updateDetails(){
        //     //I have set the condition where the user can only update his details if he enters the 
        //     // correct password,
        //     // otherwise the details will not be updated.
        //     if(this.updateDetailsForm.get('passwd')?.value===this.currUserDetails?.passwd){
        //         //.get() method is used to access the data user enter in form controls in the form group.
        //         this.currUserDetails!.name=this.updateDetailsForm.get('name')?.value;
        //         this.currUserDetails!.avatar=this.updateDetailsForm.get('avatar')?.value;
        //         this.currUserDetails!.brief=this.updateDetailsForm.get('brief')?.value;
        //         this.router.navigate(['/']);
        //     }else {
        //         //alert is a browser built-in api that displays a message in a dialog box, 
        //         // and waits for the user to click "OK" or "Cancel".
        //         alert('Incorrect password');
        //     }
        // }
    }
    updateDetails() {
        if(this.updateDetailsForm.get('passwd')?.value===this.currUserDetails?.passwd){

                    const formValues=this.updateDetailsForm.value
                    const updatedUserDetails = {
                        ...this.currUserDetails,
                        ...formValues
                    }
                    console.log(`The value of avatar going into the db is ${updatedUserDetails.avatar}`)
                    this.dbUpdateUserDetails.dbPutUserDetails(updatedUserDetails, Number(this.id)).subscribe({

                        next: (response) => {
                            console.log(`User has been updates with this response`, response)
                        },
                        error: (error) => {
                            console.error(`Update failed`, error)
                        },
                        complete: () => {
                            console.log(`Succesfully completed the updating, proceding next`)
                        }
                    })
                    this.router.navigate(['/'])
               }
        else {
            alert(`Incorrect password`)
        }
    }
}

