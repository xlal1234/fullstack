import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewproblemComponent } from './components/newproblem/newproblem.component';
import { HttpClientModule } from "@angular/common/http";

import { DataService } from "./services/data.service";
import { ProblemlistComponent } from './components/problemlist/problemlist.component';
import { ProblemdetailComponent } from './components/problemdetail/problemdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewproblemComponent,
    ProblemlistComponent,
    ProblemdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: "data",
    useClass: DataService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
