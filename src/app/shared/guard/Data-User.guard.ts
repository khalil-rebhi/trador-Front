import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {  Observable, of } from 'rxjs';
import { first,switchMap,mapTo } from 'rxjs/operators';
import { Client } from 'src/app/core/models/Client';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class DataUserGuard implements CanActivate {
  constructor(private authService:UserService){}
  canActivate():Observable<true>{
    return this.authService.user$.pipe(
        first(),
        switchMap((user: Client | null) : Observable<true> =>{
            if (!user) {
                return this.authService.getCurrentUser().pipe(mapTo(true));
            }else{
                return of(true);
            }
        })
    )
  }
  
}
