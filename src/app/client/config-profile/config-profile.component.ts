import { DatePipe } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { Store } from '@ngrx/store';
import {  map, switchMap } from 'rxjs';
import { Client } from 'src/app/core/models/Client';
import { UserService } from 'src/app/core/services/user.service';
import { update } from 'src/app/store/actions/user.action';
import { NgForm } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/header/header.component';
@Component({
  selector: 'app-config-profile',
  templateUrl: './config-profile.component.html',
  styleUrls: ['./config-profile.component.css']
})
export class ConfigProfileComponent  implements OnInit{
  selectedFile: File;
  public user : Client;
  spinner = false;
  private = false;
  showButton = "Show more";
  oldPassword : string;
  match = false;
  alertstyle: string; 
  alertmessage: string;
  imgURL: any;
  userFile: any;
  imagevalidation: string = "";
  userpicture : any = HeaderComponent.profileimage;
  public imagePath: any;
  repeatPassword: string;
  password: string;
  showPassword : false;
  birthDate : string | null;

  ngOnInit(): void {
    this.store.pipe(
      map(result => result.user.user),
      switchMap(userId => this.clientService.getClient(userId))
    ).subscribe(result => {
      if (result) {
        this.user = result
        console.log(this.user.userApplicationId);
        
        this.spinner = false;
        this.birthDate = this.getFormattedDate(this.user.birthDate);
      }
    });

    this.userpicture = 'http://localhost:8089/trador/user/getpicture/'+this.user.photo;
  }
  

  constructor( private store : Store<any> ,private clientService:UserService, private datePipe : DatePipe, private userService : UserService) {
  }

  onBirthDateChange(newDate: any) {
    if(this.birthDate){
      let dateArray = this.birthDate?.split("-");
      let date = new Date();
      date.setFullYear(parseInt(dateArray[0]),parseInt(dateArray[1])-1,parseInt(dateArray[2]));
      this.user.birthDate = date;
    }
  }
  

  updateClientProfile() {
    this.store.dispatch(update(this.user))
    this.store.pipe(
      map(result => result.user.user),
      switchMap(userId => this.clientService.getClient(userId))
    ).subscribe(result => {
      if (result) {
        this.user = result
      }
    });
  }

  showPrivate(){
    this.private = !this.private;
    if (this.private) {
      this.showButton = "Show less"
    }else{
      this.showButton = "Show more"
    }
  }

  checkPassword(){
    this.clientService.checkPassword(this.user,this.oldPassword)
      .subscribe(result => {
        if(result){
          this.match = true;
        }
      })
  }

  getFormattedDate(date : Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd')
  }

  comparePassword(){
    if (this.repeatPassword === this.user.password) {
      return true;
    }else{
      return false;
    }
  }

  hasUpperCase(input : string) : Boolean {
    return /[A-Z]/.test(input);
  }
  hasLowerCase(input : string) : Boolean {
    return /[a-z]/.test(input);
  }
  hasDigit(input : string) : Boolean {
    return /[0-9]/.test(input);
  }
  hasSpecialCharacters(input: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(input);
  }
  isPasswordLengthValid(input: string): boolean {
    return input.length >= 8 && input.length <= 24;
  }

  changePassword(){
    this.userService.resetPassword({email : this.user.email, newPass : this.password})
      .subscribe(result => console.log(result));
  }

  show(){
    this.showPassword != this.showPassword;
  }


  changeimage(imageForm: NgForm){
    if(this.userFile == null){
      this.alertstyle="danger";
      this.alertmessage="No file chosen Or The file is not supported !"; 
      this.imagevalidation = "was-validated";
      return;
    }
    const formData = new FormData();
    formData.append('iduser', this.user.idUser.toString());
    formData.append('file', this.userFile);
    console.log("iduse = "+ this.user.idUser);
    console.log(formData);
    this.userService.updateimage(formData).subscribe(

      (res: any) => {
        this.alertstyle="success";
        this.alertmessage="profile image successfully updated !"; 
        this.userpicture = this.imgURL;
        this.user = res;
        HeaderComponent.profileimage = this.imgURL;
        localStorage.setItem("photo",this.user.photo);
        console.log(this.store.select(this.user.photo));
        //AdminaccounthomeComponent.profileimagehome = this.imgURL;
      },
      (err : any)=> {
        this.alertstyle="danger";
        this.alertmessage="unable to change profile image !"; 
      }
    );
  }

  onSelectFile(event: any){

    if(event.target.files.length > 0){
      var mimeType = event.target.files[0].type;
      if(mimeType.match(/image\/png/) == null && mimeType.match(/image\/jpeg/) == null){
        this.alertstyle="warning";
        this.alertmessage="only PNG and JPG images are supported !"; 
        return;
      }
      var mimesize = event.target.files[0].size;
      if(mimesize > 410000){
        this.alertstyle="warning";
        this.alertmessage="image size must be under 400 KB !"; 
        return;
      }
      const file = event.target.files[0];
      this.userFile = file;

      var render = new FileReader();

      this.imagePath = file;
      render.readAsDataURL(file);
      render.onload =(event) => {
      this.imgURL = render.result;
      this.userpicture = this.imgURL;
      }
    }
  }
}
