import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemlistComponent } from './components/problemlist/problemlist.component';
import { ProblemdetailComponent } from './components/problemdetail/problemdetail.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "problems",
    pathMatch: "full"
  },
  {
    path: "problems",
    component: ProblemlistComponent
  },
  {
    path: "problems/:id",
    component: ProblemdetailComponent
  },
  {
    path: "**",
    redirectTo: "problems"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
