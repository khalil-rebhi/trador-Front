import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/core/models/Client';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-front-office',
  standalone : true,
  imports:[RouterModule,SidebarComponent,HeaderComponent, CommonModule, NgbCollapseModule,SpinnerComponent],
  templateUrl: './front-office.component.html',
  styleUrls: ['./front-office.component.css']
})
export class FrontOfficeComponent {
  constructor(public router: Router , private store: Store<{user : Client, accessToken : string}>) {}
  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = "full";
  public spinner = true;

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
}

