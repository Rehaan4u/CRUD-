import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Header } from '../Header/header.component';
import { Footer } from '../Footer/footer.component';
import { Users} from '../Users/users.component'
import { updateDetailsForm } from '../forms/updateDetails/updateDetails.form.component';


const appRoutes: Routes = [
  // {path: '', component: AppComponent},
  {path:'updateDetails/:name', component:updateDetailsForm}
]

@NgModule({
  declarations: [
    AppComponent,
    Header,
    Footer,
    Users,
    updateDetailsForm
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }