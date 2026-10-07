import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { Footer } from '../Footer/footer.component';
import { Header } from '../Header/header.component';
import { Users } from '../Users/users.component';
import { deleteUserForm } from "../forms/updateDetails/DeleteUser.form/deleteUser.form.component";
import { addUserForm } from '../forms/updateDetails/addUser.form/addUser.form.component';
import { updateDetailsForm } from '../forms/updateDetails/updateDetails.form.component';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { animeLoader } from 'src/animation/loader.component';
import { fullView } from '../fullView/fullView.component';



const appRoutes: Routes = [
  // {path: '', component: AppComponent},
  //here the :name is a route parameter, which is a placeholder for a value that can be passed in the URL.
  //it can store john or 123 its basically of fixed type as string but can be converted to number if needed.
  {path:'updateDetails/:id', component:updateDetailsForm},
  {path:'addUserForm', component: addUserForm},
  {path:'deleteUserForm/:userId', component: deleteUserForm},
  {path:'fullView/:userId', component: fullView}
]

@NgModule({
  declarations: [
    AppComponent,
    Header,
    Footer,
    Users,
    updateDetailsForm,
    addUserForm,
    deleteUserForm,
    fullView,
    animeLoader
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}