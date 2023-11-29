import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/models/Client';
import { Course } from 'src/app/core/models/Course';
import { CoursesService } from 'src/app/core/services/courses.service';
import { PortefeuilleService } from 'src/app/core/services/portefeuille.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';
declare var Razorpay:any;
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit{
 

 

  constructor(private coursesService: CoursesService, private router :Router, private portefeuilleService:PortefeuilleService) { }

  courses: Course[] = [];
  idcourse: number = 1;

  ngOnInit(): void {
    this.getAllCourses();
  }

tocourse(){
  this.router.navigateByUrl("trador/client/course1")
}
  getAllCourses(): void {
    this.coursesService.getAllCourses().subscribe(
      (data: Course[]) => {
        this.courses = data; // Assignez les cours à la variable courses
        console.log(this.courses); // Facultatif : Affichez les cours dans la console
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  gotocourse(idcourse: number): void {
    this.coursesService.getCourseById(idcourse).subscribe(
      (data: Course) => {
        this.courses = [data]; // Vous pouvez vouloir assigner le cours à un tableau pour rester cohérent avec le type de courses
        console.log(this.courses);
      },
      error => {
        console.error('Error fetching course by ID:', error);
      }
    );
  }


  
amount:number= 99;
public user:Client;
solde:number;

  depositAndPlaceOrder() {
    let amount = this.amount;
    this.portefeuilleService.deposit(amount).subscribe((response) => {
      console.log(response);
      this.openDepositModal(response);
    },
    (error)=> {
      console.log(error);
    });
   }


openDepositModal(response : any){
  var options = {
    order_id : response.order_id,
    key : response.key,
    amount : response.amount,
  currency : response.currency,
name : 'Deposit NOW' ,
description : 'Trador is the best app to trade',
image : 'https://media.istockphoto.com/id/1426308349/fr/photo/vue-rapproch%C3%A9e-des-mains-qui-sortent-de-largent-dun-portefeuille.webp?b=1&s=612x612&w=0&k=20&c=-Z19iFMTAJfjyjvH3nUp2nkY01DPQ8GILIvtjubnxi0=',
handler: (response : any) =>{
  this.processResponse(response);
  const formData = new FormData();
  formData.append('idUser', this.user.idUser.toString());
  formData.append('amount', this.amount.toString());
  this.portefeuilleService.updatePortefeuilleBalance(formData).subscribe((response) => {
    console.log(response);
    
    HeaderComponent.profilesolde = response.solde + this.amount;
  },
  (error)=> {
    console.log(error);
  });

  //this.solde = this.solde + this.amount;
  console.log(this.solde);
},
prefill : {
  name : 'LPY',
  email : 'LPY@GMAIL.COM',
  contact : '90909090',
  upi :'success@razorpay'
},
notes : {
  address : 'Trador Application'
},
theme: {
  color: '#F37254'
}
  };

var razorPayObject = new Razorpay(options);
razorPayObject.open();
  }

  processResponse(resp : any ){
    console.log(resp);
  }
}
