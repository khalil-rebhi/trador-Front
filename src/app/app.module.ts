import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Approutes } from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { FrontOfficeComponent } from './layouts/front-office/front-office.component';
import { LoginComponent } from './shared/login/login.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { SignupComponent } from './shared/signup/signup.component';
import { LandingComponent } from './shared/landing/landing.component';
import { ForgetComponent } from './shared/forget/forget.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { VerifCodeComponent } from './shared/verif-code/verif-code.component';
import { VerificationCodeTimerComponent } from './shared/verification-code-timer/verification-code-timer.component';
import { ResetPasswordFormComponent } from './shared/reset-password-form/reset-password-form.component';
import { BackOfficeComponent } from './layouts/back-office/back-office.component';
import { SimpleNotificationsModule } from 'angular2-notifications';import { MarketModule } from './market/market.module';
import { DataSurveillanceComponent } from './shared/data-surveillance/data-surveillance.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LandingComponent,
    ForgetComponent,
    NotfoundComponent,
    VerifCodeComponent,
    VerificationCodeTimerComponent,
    ResetPasswordFormComponent,
    BackOfficeComponent,
  ],
  imports: [
    MarketModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FrontOfficeComponent,
    HeaderComponent,
    SpinnerComponent,
    SidebarComponent,
    DataSurveillanceComponent,
    StoreModule.forRoot({user : userReducer}),
    EffectsModule.forRoot(UserEffects),
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
