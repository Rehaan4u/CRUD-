import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userData } from '../interfaces/userData.interface';
import { dbFetchParticularUser } from '../services/dbFetchParitcularUser.service';

@Component({
    selector:"app-full-view",
    templateUrl: "fullView.component.html",
    styleUrls:["fullView.component.css"],
    animations:[trigger('fade',
        [
          transition(':enter', 
            [
              style({opacity:0}),
              animate('200ms ease-in', style({ opacity: 1 }))
            ]),
           transition(':leave',
            [
              style({opacity:1}),
              animate('150ms ease-out', style({ opacity: 0 }))
            ])
        ])]
})
export class fullView 
{
    public particularUserData: userData| null=null;    
    constructor(
        public Routes:ActivatedRoute,
        public route:Router,
        public userService:dbFetchParticularUser,
        //Can not inject the interface type as it won't be there during the runtime,should be declared outside
        // public particularUserData:userData
    ){};

    ngOnInit()
    {
        //Very important observation when you declare a variable for getting the value 
        // from the url, it should be of 
        //type string or null
        const id:string| null = this.Routes.snapshot.paramMap.get('userId');
        //If there is id then only component loads otherwise not
        console.log(`Id in the fullView form received is ${id}`)
        if(id!=null){
            this.fullViewMethod(id);
        }
    }

    public fullViewMethod(userID:string):void 
    {
        //in ts you add -> "+" to convert String->Integer
        console.log(`ID int he fullViewMethod is ${userID}`)
        this.userService.fullViewByID(+userID).subscribe({
            next:(next)=>{
                if(next.id!=null)
                {
                    this.particularUserData=next;
                }
            },
            error: (error)=>{
                alert("Data not Available")
            },
            complete:()=>console.log('Fetching data executed succefully')
        })
            
    }
    public goBack(): void 
    {
        this.route.navigate(["/"]);
    }

};