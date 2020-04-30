import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ComposantService } from '../Composant/composant.service';
import { Chaudiere, ChaudiereForGet } from '../Chaudiere/chaudiere.model';
import { environment } from '../../../../environments/environment';
import { TypeChaudiere } from './type-chaudiere.model';

@Injectable({
  providedIn: 'root'
})
export class TypeChaudiereService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ListTypeChaudiere: TypeChaudiere[];

  AddOrUpdateForm = this.fb.group({
    typeChaudiereId: [''],
    libelle: ['']
  });

  initializeAddOrUpdateFormForAdd() {
    this.AddOrUpdateForm.setValue({
      typeChaudiereId: '00000000-0000-0000-0000-000000000000',
      libelle: ''
    });
  }

  initializeAddOrUpdateFormForUpdate(typeChaudiere: TypeChaudiere) {
    this.AddOrUpdateForm.setValue({
      typeChaudiereId: typeChaudiere.typeChaudiereId,
      libelle: typeChaudiere.libelle
    });
  }

  getList() {
    return this.http.get(environment.ChaudiereMicroservice + '/TypeChaudiere');
  }

  delete(typeChaudiereId: string) {
    return this.http.delete(environment.ChaudiereMicroservice + '/TypeChaudiere/DeleteTypeChaudiere?id=' + typeChaudiereId);
  }

  post() {
    return this.http.post(environment.ChaudiereMicroservice + '/TypeChaudiere/AddTypeChaudiere', this.AddOrUpdateForm.value);
  }

  update() {
    return this.http.put(environment.ChaudiereMicroservice + '/TypeChaudiere/PutTypeChaudiere', this.AddOrUpdateForm.value);
  }

}
