import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Chaudiere, ChaudiereForGet } from './chaudiere.model';
import { environment } from 'src/environments/environment';
import { ComposantService } from '../Composant/composant.service';
import { Filiale } from '../../FilialeMS/filiale.model';

@Injectable({
  providedIn: 'root'
})
export class ChaudiereService {

  constructor(private http: HttpClient, private fb: FormBuilder, private composantService: ComposantService) { }
  chaudiere: Chaudiere;
  ListChaudiereForGet: ChaudiereForGet[];
  FilialeListParam: Filiale[];
  NombreTotalChaudiere: number;

  AddOrUpdateForm = this.fb.group({
    chaudiereId: [''],
    subsidiaryId: ['', [Validators.required]],
    type: ['', [Validators.required]],
    typeChaudiereId: ['', [Validators.required]],
    numero: ['', [Validators.required, Validators.min(1)]]

  });

  initializeAddOrUpdateFormForAdd() {
    this.AddOrUpdateForm.setValue({
      chaudiereId: '00000000-0000-0000-0000-000000000000',
      subsidiaryId: '00000000-0000-0000-0000-000000000000',
      typeChaudiereId: '00000000-0000-0000-0000-000000000000',
      type: '',
      numero: ''
    });
  }

  initializeAddOrUpdateFormForUpdate(chaudiereId: string) {
    this.getChaudiereById(chaudiereId).subscribe(res => {
      this.chaudiere = res as Chaudiere;
      this.AddOrUpdateForm.setValue({
        chaudiereId: this.chaudiere.chaudiereId,
        subsidiaryId: this.chaudiere.subsidiaryId,
        typeChaudiereId: this.chaudiere.typeChaudiereId,
        type: this.chaudiere.type,
        numero: this.chaudiere.numero
      });
    });

  }

  getListChaudiere() {
    return this.http.get(environment.ChaudiereMicroservice + '/Chaudiere');
  }

  getChaudiereById(chaudiereId: string) {
    return this.http.get(environment.ChaudiereMicroservice + '/Chaudiere/id?id=' + chaudiereId);
  }

  getListChaudiereDto() {
    return this.http.get(environment.ChaudiereMicroservice + '/Chaudiere/GetChaudiereDto');
  }


  deleteChaudiere(chaudiereId: string) {
    return this.http.delete(environment.ChaudiereMicroservice + '/Chaudiere/DeleteChaudiere?Id=' + chaudiereId);
  }

  postChaudiere() {
    return this.http.post(environment.ChaudiereMicroservice + '/Chaudiere/AddChaudiere', this.AddOrUpdateForm.value);
  }

  updateChaudiere() {
    return this.http.put(environment.ChaudiereMicroservice + '/Chaudiere/PutChaudiere', this.AddOrUpdateForm.value);
  }

  getFilialeLisParam() {
    return this.http.get(environment.ChaudiereMicroservice + '/Filiale');
  }



}
