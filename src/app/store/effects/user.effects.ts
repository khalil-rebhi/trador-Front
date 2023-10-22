import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/core/services/user.service";
import { CURRENT_USER, LOGIN, LOGIN_SUCCESS, LOGOUT, SIGNUP, UPDATE } from "../actions/user.action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Client } from "src/app/core/models/Client";

@Injectable()
export class UserEffects{

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LOGIN),
            exhaustMap((action: {email : string, password : string, type : string}) => this.authService.login({email : action.email, password : action.password})
            .pipe(
                map(user => ({type : LOGIN_SUCCESS ,payload : user})),
                catchError(error =>{
                    console.log(error.status);
                    
                    throw new Error("Login failed");
                })
            )
            )
        )
    );

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(LOGIN_SUCCESS),
        exhaustMap((payload : {payload : {accessToken : string , user : Client}, type : string}) => {
            localStorage.setItem("accessToken",payload.payload.accessToken);
            this.router.navigateByUrl("trador");
          return of({ type: 'NO_ACTION' });
        })
      ));

      logout$ = createEffect(() => this.actions$.pipe(
        ofType(LOGOUT),
        exhaustMap(() => {
            localStorage.removeItem("accessToken");
            this.router.navigateByUrl("login");
            return of({type : 'NO_ACTION'});
        })
      ))

      signup$ = createEffect(() => this.actions$.pipe(
        ofType(SIGNUP),
        exhaustMap((payload : Client) => {
            const {type , ...result} = payload;
            this.authService.signup(result).subscribe(() => {
                this.router.navigateByUrl("login");
                return of({type : 'NO_ACTION'})
            });
            return of({type : 'NO_ACTION'});
        })
      ))

      update$ = createEffect(()=>this.actions$.pipe(
        ofType(UPDATE),
        exhaustMap((payload:Client)=>{
            const{type , ...result}=payload;
            let myUser = Client.fromObject(result);
            this.clientService.updateClient(myUser).subscribe(()=>{
                return  of({type : 'NO_ACTION'})
            });
            return of({type : 'NO_ACTION'});
        })
      ))

    constructor (
        private actions$ : Actions,
        private authService : UserService,
        private router : Router,
        private clientService:UserService
        
    ) {}




}