import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { permanentDeleteUser } from 'src/services/deleteUser.service';

@Component({
    selector: "app-delete-form",
    templateUrl: "deleteUser.form.component.html",
    styleUrls:["deleteUser.form.component.css"]
})
export class deleteUserForm
{   
    public userId:string | null=null;
  
    constructor(
        //Alwyas provide the modifiers {public,private, protected}
       public  routePath:ActivatedRoute,
       public route:Router,
       public permanentDeleteUser:permanentDeleteUser,
       
    ){};

    
    PermantDeleteUser = new FormGroup({
            passwd: new FormControl('')
        })

    ngOnInit():void 
    {
        this.userId=this.routePath.snapshot.paramMap.get('userId')
     
    }
    DeleteUser():void 
    {
        if(this.userId==null)
        {
            console.error(`The id was not passed`);
            return ;
        }
        else 
        {
            this.permanentDeleteUser.deleteUser(this.userId).subscribe({
                next: (next)=>console.log(`DELETE call was made succesfully`),
                error:(error)=>console.error(`Error in making the DELETE call`),
                complete:()=> console.log(`DELETE call completed`)

            })
        }
    }  
};