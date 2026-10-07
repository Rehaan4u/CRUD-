import { ChangeDetectorRef, Component } from '@angular/core'
// import {userDetails } from '../services/userData.service'
import { userData } from '../interfaces/userData.interface'
import { dbFetchedData } from '../services/dbFetchedDate.service'
// import { addUserForm } from 'src/forms/updateDetails/addUser.form/addUser.form.component'
import { animate, style, transition, trigger } from '@angular/animations'
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router'

  


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[trigger('fade',
    [
      transition(':enter', 
        [
          style({opacity:0}),
          animate('2000ms ease-in', style({ opacity: 1 }))
        ]),
       transition(':leave',
        [
          style({opacity:1}),
          animate('1500ms ease-out', style({ opacity: 0 }))
        ])
    ])]
})

export class AppComponent {

  public loading:boolean =false;

  constructor(private userDetails:dbFetchedData, 
    public ref: ChangeDetectorRef,
    // public addUser: addUserForm,
    public route: Router
    // public refS: ChangeDetectionStrategy.OnPush
  ) {}
  users:userData[]=[]
  // user1=this.userDetails.getUserData(1);
  // user2=this.userDetails.getUserData(2);
  // user3=this.userDetails.getUserData(3);

  ngOnInit(): void {

    this.route.events.subscribe((event)=>{
      if(event instanceof NavigationStart)
      {
        this.loading=true;
      }
      else if(event instanceof NavigationCancel || 
              event instanceof  NavigationEnd || 
              event instanceof NavigationError){
        this.loading=false;
      }
    }

    )
     this.userDetails.user$.subscribe({
      next: (data) => {
        this.users=data;
        console.log('User data loaded successfully:', this.users);
      },
      error: (error) => {
        console.error('Error loading user data:', error);
      },
      complete: () => {
        console.log('User data loading complete.');
      }
    })
  }

  // ngAfterViewInit(): void{
      // this.ref.detectChanges();
  // }

}
