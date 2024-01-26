import { Routes } from '@angular/router';
import { FrontOfficeComponent } from './layouts/front-office/front-office.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { LandingComponent } from './shared/landing/landing.component';
import { ForgetComponent } from './shared/forget/forget.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { BackOfficeComponent } from './layouts/back-office/back-office.component';
import { DataUserGuard } from './shared/guard/Data-User.guard';
import { ChatComponent } from './chat/chat.component';
import { NewsComponentComponent } from './news-component/news-component.component';
import { EduAdminComponent } from './admin/edu-admin/edu-admin.component';


export const Approutes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: LandingComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forget', component: ForgetComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'news', component: NewsComponentComponent }
    ]
  },
  {
    path: 'trador',
    //canActivate:[DataUserGuard],
    component: FrontOfficeComponent,
    children: [
      { path: 'trador', redirectTo: '/client', pathMatch: 'full' },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'market/:market/:symbole', loadChildren: () => import('./market/market.module').then(m => m.MarketModule)
      },
      
      {
        path: 'education', loadChildren: () => import('./client/education/education.module').then(m => m.EducationModule)
      }
    ]
  }, 
  {
    path: 'admin',
    component: BackOfficeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      {
        path:'eduAdmin', component:EduAdminComponent
      }
    ]
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
