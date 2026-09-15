import { Component } from '@angular/core'
// import {userDetails } from '../services/userData.service'
import {userData} from '../interfaces/userData.interface'
import {dbFetchedData} from '../services/dbFetchedDate.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private userDetails:dbFetchedData ) {}
  users:userData[]=[]
  // user1=this.userDetails.getUserData(1);
  // user2=this.userDetails.getUserData(2);
  // user3=this.userDetails.getUserData(3);

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    this.userDetails.getUserData().subscribe({
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

}
