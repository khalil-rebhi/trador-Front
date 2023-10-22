import { createReducer, on } from "@ngrx/store";
import { Client } from "src/app/core/models/Client";
import { User, loginSucces, logout, update, verify } from "../actions/user.action";

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
  on(loginSucces, (state,{payload}) => payload),
  on(logout, () => emptyState),
  on(update, (state, payload) =>{
    return {
      accessToken : state.accessToken,
      user : payload
    }
  } ),
  on(verify , (state) => ({
    ...state,
    user : {
      ...state.user,
      isVerified : true
    }
  }))
)