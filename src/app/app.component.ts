import { Component } from '@angular/core'
import {Header} from '../Header/header.component'
import {Footer} from '../Footer/footer.component'
import {userDetails } from '../services/userData.service'
import {userData} from '../interfaces/userData.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private userDetails:userDetails) {}

  user1=this.userDetails.getUserData(1);
  user2=this.userDetails.getUserData(2);
  user3=this.userDetails.getUserData(3);


}
