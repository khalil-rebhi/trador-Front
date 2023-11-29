import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
 
 
  constructor(private http :HttpClient) { }




  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('http://localhost:8089/trador/courses/getcourse');
  }

  getCourseById(idcourse:number):Observable<Course>{
    return this.http.get<Course>(`http://localhost:8089/trador/courses/getById/${idcourse}`)
  }


  addCourses(course:Course):Observable<Course>{
    return this.http.post<Course>('http://localhost:8089/trador/courses/create',course)
  }

  


 
}
