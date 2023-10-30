import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from './core/models/Data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSurveillanceService {

  constructor(private http : HttpClient) { }

  getData(ticker : string): Observable<any> {
    return this.http.get(`http://localhost:8089/trador/data/data/${ticker}`);
  }
  

}
