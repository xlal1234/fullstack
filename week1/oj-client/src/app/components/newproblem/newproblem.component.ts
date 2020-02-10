import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../dao/problem.model";
//import {NgForm} from '@angular/forms';

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name: "",
  desc: "",
  difficulty: "Easy"
});
@Component({
  selector: 'app-newproblem',
  templateUrl: './newproblem.component.html',
  styleUrls: ['./newproblem.component.css']
})
export class NewproblemComponent implements OnInit {

  public difficulties = ["Easy", "Medium", "Hard", "Super"];
  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);
  constructor(@Inject("data") private data) { }

  ngOnInit() {
  }

  addProblem(): void{

    this.data.addProblem(this.newProblem).catch(error => console.log(error._body));
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  
  }

}
