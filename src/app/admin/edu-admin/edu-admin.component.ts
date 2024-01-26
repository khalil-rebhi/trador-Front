import { Component, Input, OnInit } from '@angular/core';
import { NumericMarkerManager } from 'igniteui-angular-charts';
import { Chapter } from 'src/app/core/models/Chapter';
import { Course } from 'src/app/core/models/Course';
import { CoursesService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-edu-admin',
  templateUrl: './edu-admin.component.html',
  styleUrls: ['./edu-admin.component.css']
})
export class EduAdminComponent implements OnInit {


  ngOnInit(){
   this.addCourse
  }

  constructor(private courseService:CoursesService , ){}

  course:Course = {
    title: '',
    description: '',
    content: '',
    idcourse: 0
  }
  addCourse(){
   this.courseService.addCourses(this.course).subscribe();
  }
courseId=0
chapter:Chapter={
   title:'',
    content:'',
    id:0
  }

  

  addChapter(){
    this.courseService.addChapter(this.courseId, this.chapter).subscribe();
  }
 

  
}
