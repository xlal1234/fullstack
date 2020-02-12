import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from "../../dao/problem.model";
import { Subscription } from 'rxjs';

// export const PROBLEMS: Problem[] = [
//   {
//     id: 1,
//     name: "Two Sum",
//     desc: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
//     difficulty: "EASY"
//   },
//   {
//     id: 2,
//     name: "Three Sum",
//     desc: 'Given an array S of integers, find three numbers..',
//     difficulty: "MEDIUM"
//   },
//   {
//     id: 3,
//     name: "4Sum",
//     desc: 'Given an array S of integers, find three numbers..',
//     difficulty: "MEDIUM"
//   },
//   {
//     id: 4,
//     name: "Triangle Count",
//     desc: 'Given an array S of integers, find three numbers..',
//     difficulty: "Hard"
//   },
//   {
//     id: 5,
//     name: "Sliding Window Maximum",
//     desc: 'Given an array S of integers, find three numbers..',
//     difficulty: "Hard"
//   }
// ];

@Component({
  selector: 'app-problemlist',
  templateUrl: './problemlist.component.html',
  styleUrls: ['./problemlist.component.css']
})
export class ProblemlistComponent implements OnInit {

  problems: Problem[] = [];
  subscriptionProblems: Subscription;

  constructor(@Inject("data") private data) { }

  ngOnInit() {
    this.getProblems();
  }
  getProblems(): void {
    this.subscriptionProblems = this.data.getProblems()
                              .subscribe(problems => this.problems = problems);
  }
}
