import { Injectable } from '@angular/core';
import { Problem } from "../dao/problem.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getProblems(): Observable<Problem[]> {
    this.http.get("api/v1/problems")
      .toPromise()
      .then( (res : Problem[] ) => {
          this.problemsSource.next(res);
        }
      ).catch(this.handleError);
      
    return this.problemsSource.asObservable();  
  }
  
  getProblem(id: number): Promise<Problem>{
    return this.http.get(`api/v1/problems/${id}`)
                     .toPromise()
                     .then((res: Problem) =>{ return res; })
                     .catch(this.handleError);
  }

  addProblem(problem: Problem): Promise<Problem>{
    let headers = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post<Problem>('/api/v1/problems', problem, {headers} )
      .toPromise()
      .then((res: Problem) => {
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('An error occurred', error);
    return Promise.reject(error.body || error);
  }
}
