import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Unite } from './unite.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniteService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ListUnite: Unite[];

  AddOrUpdateForm = this.fb.group({
    uniteId: [''],
    libelle: ['']
  });

  initializeAddOrUpdateFormForAdd() {
    this.AddOrUpdateForm.setValue({
      uniteId: '00000000-0000-0000-0000-000000000000',
      libelle: ''
    });
  }

  initializeAddOrUpdateFormForUpdate(unite: Unite) {
    this.AddOrUpdateForm.setValue({
      uniteId: unite.uniteId,
      libelle: unite.libelle
    });
  }

  getList() {
    return this.http.get(environment.ChaudiereMicroservice + '/Unite');
  }

  delete(uniteId: string) {
    return this.http.delete(environment.ChaudiereMicroservice + '/Unite/DeleteUnite?id=' + uniteId);
  }

  post() {
    return this.http.post(environment.ChaudiereMicroservice + '/Unite/AddUnite', this.AddOrUpdateForm.value);
  }

  update() {
    return this.http.put(environment.ChaudiereMicroservice + '/Unite/PutUnite', this.AddOrUpdateForm.value);
  }

  getUniteByFilialeId(filialeId: string) {
    return this.http.get(environment.ChaudiereMicroservice + '/Unite/getUniteByFilialeId?filialeId=' + filialeId);
  }
}
