import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewproblemComponent } from './components/newproblem/newproblem.component';

import { DataService } from "./services/data.service";
import { ProblemlistComponent } from './components/problemlist/problemlist.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewproblemComponent,
    ProblemlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{
    provide: "data",
    useClass: DataService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
