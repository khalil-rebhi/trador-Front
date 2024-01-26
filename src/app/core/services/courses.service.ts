import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/Course';
import { Chapter } from '../models/Chapter';


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

  addChapter(courseId:number , chapter:Chapter):Observable<Chapter>{
    return this.http.post<Chapter>(`http://localhost:8089/trador/chapters/create/${courseId}`,chapter)
  }


 
}
