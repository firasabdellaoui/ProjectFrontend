import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ComposantDto } from './composant.model';
import { Chaudiere } from '../Chaudiere/chaudiere.model';

@Injectable({
  providedIn: 'root'
})
export class ComposantService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }
  ListComposantByChaudiereId: ComposantDto[];
  chaudiereId: string;

  getComposants(chaudiereId: string) {
    return this.http.get(environment.ChaudiereMicroservice + '/Composant/GetComposantDto?chaudiereId=' + chaudiereId)
      .toPromise().then(res => this.ListComposantByChaudiereId = res as ComposantDto[]);
  }

  deleteComposant(composantId: string) {
    return this.http.delete(environment.ChaudiereMicroservice + '/Composant/DeleteComposant?id=' + composantId);
  }

  refreshListComposants(event) {
    this.http.get(environment.ChaudiereMicroservice + '/Composant/GetComposantDto?chaudiereId=' + event)
      .toPromise().then(res => this.ListComposantByChaudiereId = res as ComposantDto[]);
  }


}
