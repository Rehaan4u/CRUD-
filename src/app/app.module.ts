import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Header } from '../Header/header.component';
import { Footer } from '../Footer/footer.component';
import { Users} from '../Users/users.component'
import { updateDetailsForm } from '../forms/updateDetails/updateDetails.form.component';

import {HttpClientModule} from '@angular/common/http'



const appRoutes: Routes = [
  // {path: '', component: AppComponent},
  //here the :name is a route parameter, which is a placeholder for a value that can be passed in the URL.
  //it can store john or 123 its basically of fixed type as string but can be converted to number if needed.
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
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }