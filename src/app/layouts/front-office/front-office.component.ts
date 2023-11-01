import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/core/models/Client';
import { UserService } from 'src/app/core/services/user.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { verify } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-front-office',
  standalone : true,
  imports:[RouterModule,SidebarComponent, HeaderComponent , CommonModule, NgbCollapseModule,SpinnerComponent,FormsModule],
  templateUrl: './front-office.component.html',
  styleUrls: ['./front-office.component.css']
})
export class FrontOfficeComponent {
  constructor(public router: Router , private store: Store<any>, private userService: UserService) {}
  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = "full";
  public spinner = true;
  public user : Client;
  public verify= true;
  public code = "";
  public error = false;

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    setTimeout(() =>{
          /* if (this.router.url === "/") {
      this.router.navigate(["/dashboard"]);
    } */
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
    this.spinner = !this.spinner
  },500)
  this.store.subscribe(result =>this.user = result.user.user);
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    this.sidebartype = "full"
    if (this.innerWidth < 1170) {
      this.sidebartype = "full";
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case "full":
        this.sidebartype = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.sidebartype = "full";
        break;

      default:
    }
  }

  sendVerificationMail(){
    this.userService.sendEmail(this.user.email).subscribe(res => this.verify = false
    )
  }

  verifyCode(){
    this.userService.sendVerificationCode(this.user.email, this.code).subscribe(res => {
      if (res) {
        this.store.dispatch(verify())
        this.router.navigateByUrl("/trador");
      }else{
        this.error = true;
      }
    })
  }
}

