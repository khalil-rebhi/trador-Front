import { createReducer, on } from "@ngrx/store";
import { Client } from "src/app/core/models/Client";
import { User, login, loginSucces, logout } from "../actions/user.action";

const emptyState : User ={
  user : new Client(),
  accessToken : ''
}

export const initialState : User = {
  user : new Client(),
  accessToken : ''
};

export const userReducer = createReducer(
  initialState,
  on(loginSucces, (state, {payload}) => payload),
  on(logout, (state) => emptyState)
)

