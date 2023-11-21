import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../models/Data';

@Injectable({
  providedIn: 'root'
})
export class DataSurveillanceService {

  constructor(private http : HttpClient) { }

  getData(ticker : string): Observable<Data> {
    return this.http.get<Data>(`http://localhost:8089/trador/data/data/${ticker}`);
  }
  

}
