import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/core/models/Course';
import { CoursesService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-edu-admin',
  templateUrl: './edu-admin.component.html',
  styleUrls: ['./edu-admin.component.css']
})
export class EduAdminComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private courseService:CoursesService){}
 

  
}
