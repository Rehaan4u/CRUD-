import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Header } from '../Header/header.component';
import { Footer } from '../Footer/footer.component';
import { Users} from '../Users/users.component'

@NgModule({
  declarations: [
    AppComponent,
    Header,
    Footer,
    Users
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }