import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/core/services/auth.service";
import { LOGIN, LOGIN_SUCCESS, LOGOUT, login } from "../actions/user.action";
import { EMPTY, catchError, exhaustMap, map, of } from "rxjs";
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
                catchError(() => EMPTY)
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

    constructor (
        private actions$ : Actions,
        private authService : AuthService,
        private router : Router
    ) {}
}