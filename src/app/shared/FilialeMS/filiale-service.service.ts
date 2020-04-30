import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filiale } from './filiale.model';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FilialeServiceService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  FilialeList: Filiale[];
  FilialeListFromMSFiliale: Filiale[];


  AddOrUpdateForm = this.fb.group({
    subsidiaryId: [''],
    subsidiaryCode: [''],
    label: [''],
    logo: [''],
    uniteId: ['']
  });


  initializeAddOrUpdateFormForUpdate(filiale: Filiale) {
    this.AddOrUpdateForm.setValue({
      subsidiaryId: filiale.subsidiaryId,
      subsidiaryCode: filiale.subsidiaryCode,
      label: filiale.label,
      logo: filiale.logo,
      uniteId: filiale.uniteId
    });
  }












  getFilialeList() {
    return this.http.get(environment.ChaudiereMicroservice + '/Filiale/GetFilialesFromMS');
  }
  getFiliales() {
    return this.http.get(environment.ChaudiereMicroservice + '/Filiale');
  }
  post(filiale: Filiale) {
    return this.http.post(environment.ChaudiereMicroservice + '/Filiale/AddFiliale', filiale);
  }
  delete(filialeId: string) {
    return this.http.delete(environment.ChaudiereMicroservice + '/Filiale/DeleteFiliale?id=' + filialeId);
  }
  update() {
    return this.http.put(environment.ChaudiereMicroservice + '/Filiale/PutFiliale', this.AddOrUpdateForm.value);
  }

}