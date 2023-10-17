import { createAction, props } from "@ngrx/store";
import { Client } from "src/app/core/models/Client";

export interface User {
    user : Client,
    accessToken : string
}

export const LOGIN = '[USER] LOGIN';
export const LOGIN_SUCCESS = '[USER] LOGIN SUCCESS'
export const LOGOUT = '[USER] LOGOUT'
export const SIGNIN = '[USER] SIGNIN'
export const UPDATE = '[USER] UPDATE'


export const login = createAction(LOGIN, props<{email : string, password: string}>());
export const loginSucces = createAction(LOGIN_SUCCESS, props<{payload : User}>());
export const logout = createAction(LOGOUT);
export const signup = createAction(SIGNIN, props<Client>());
export const update= createAction(UPDATE ,props<Client>());