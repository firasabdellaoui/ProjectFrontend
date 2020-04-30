import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subsidiary } from './subsidiary.model';

@Injectable({
  providedIn: 'root'
})
export class SubsidiaryService {
ListSubsidiaries : Subsidiary[]
  constructor(private http: HttpClient) { }


  getListSubsidiaries() {
    return this.http.get(environment.ChaudiereMicroservice + "/filiale")
     //return this.http.get(environment.SubsidiaryMicroservice + "/subsidiary")
    //return this.http.get("http://localhost:5021/api/Subsidiary")
  }
}
