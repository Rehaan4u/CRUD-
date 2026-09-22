import{Component} from '@angular/core'
import {FormGroup, FormControl} from '@angular/forms'
import {userData} from '../../../interfaces/userData.interface' 
import { addUserData} from '../../../services/adduserData.service'
import {Router, ActivatedRoute} from '@angular/router'
// import { ReactiveFormsModule } from '@angular/forms'


@Component({
    selector:'app-user-update',
    templateUrl: 'addUser.form.component.html',
    styleUrls:['addUser.form.component.css']
})
export class addUserForm {

    private reqPasswd= "2004"
    private officialPasswd="3690"

    public newUserObj:userData = {
        id:'',
        name:'',
        brief:'',
        avatar: '',
        passwd:'3690'
    }

    constructor(
        private addUserData: addUserData, 
        public route:Router,
        //public newUserObj: userData
    ){}

        public validUser = new FormGroup({
            verifyPasswd: new FormControl('')
        })

        public addUserForm = new FormGroup({
            id: new FormControl(''),
            name: new FormControl(''),
            brief: new FormControl(''),
            // passwd: new FormControl('')
        })
    
    onAddUser(): void{
        if(this.validUser.get('verifyPasswd')?.value===this.reqPasswd){
                    this.newUserObj= {
                        ...this.newUserObj,
                        ...this.addUserForm.value,
        }
            this.addUserData.postDataIntoDB(this.newUserObj).subscribe({
                error: (error) => {
                    console.error(`Error in making the POST call`)
                },
                complete: ()=> {
                    console.log(`Succesfully completed the Post call`)
                }
            })
            this.route.navigate(['/'])       
        }
        else {
            alert('Wrong password: Not verified to make the POST call')
        }
    }

}