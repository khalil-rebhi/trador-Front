import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { NgxGaugeModule } from 'ngx-gauge';

import { Approutes } from './app-routing.module';
import { userReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';
import { SymboleStore } from './store/SymboleStore';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { LandingComponent } from './shared/landing/landing.component';
import { ForgetComponent } from './shared/forget/forget.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { VerifCodeComponent } from './shared/verif-code/verif-code.component';
import { VerificationCodeTimerComponent } from './shared/verification-code-timer/verification-code-timer.component';
import { ResetPasswordFormComponent } from './shared/reset-password-form/reset-password-form.component';
import { BackOfficeComponent } from './layouts/back-office/back-office.component';
import { FrontOfficeComponent } from './layouts/front-office/front-office.component';
import { DataSurveillanceComponent } from './shared/data-surveillance/data-surveillance.component';
import { DepositComponent } from './deposit/deposit.component';
import { ChatbotComponent } from './shared/chatbot/chatbot.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { MarketModule } from './market/market.module';

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
    DepositComponent,
    ChatbotComponent,

    PostComponent,
    CommentComponent,
  ],
  imports: [
    FrontOfficeComponent,
    DataSurveillanceComponent,
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    SpinnerComponent,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
    SimpleNotificationsModule.forRoot(),
    NgxGaugeModule,
    MarketModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    SymboleStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
