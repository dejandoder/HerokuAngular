import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../model/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }


  preuzmiSveStudente(){
    return this.http.get<any>('api/students/all');
  }
}
