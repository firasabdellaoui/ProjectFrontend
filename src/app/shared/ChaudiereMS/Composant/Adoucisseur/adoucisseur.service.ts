import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Adoucisseur } from '../composant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdoucisseurService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }
  AdoucisseurList: Adoucisseur[];

  AddOrUpdateForm = this.fb.group({
    volumeResine: [''],
    debitUtilisation: [''],
    type: [''],
    composantId: [''],
    dateAcquisition: [''],
    prixAcquisition: [''],
    etat: [''],
    chaudiereId: [''],
  });

  initializeAddOrUpdateFormForAdd() {
    this.AddOrUpdateForm.setValue({
      volumeResine: '',
      debitUtilisation: '',
      type: '',
      composantId: '00000000-0000-0000-0000-000000000000',
      dateAcquisition: '',
      prixAcquisition: '',
      etat: '',
      chaudiereId: '00000000-0000-0000-0000-000000000000'
    });
  }

  initializeAddOrUpdateFormForUpdate(adoucisseur: Adoucisseur) {
    this.AddOrUpdateForm.setValue({
      volumeResine: adoucisseur.volumeResine,
      debitUtilisation: adoucisseur.debitUtilisation,
      type: adoucisseur.type,
      composantId: adoucisseur.composantId,
      dateAcquisition: adoucisseur.dateAcquisition,
      prixAcquisition: adoucisseur.prixAcquisition,
      etat: adoucisseur.etat,
      chaudiereId: adoucisseur.chaudiereId
    });
  }


  getList() {
    return this.http.get(environment.ChaudiereMicroservice + '/Adoucisseur');
  }

  getById(composantId: string) {
    return this.http.get(environment.ChaudiereMicroservice + '/Adoucisseur/id?id=' + composantId);
  }


  delete(composantId: string) {
    return this.http.delete(environment.ChaudiereMicroservice + '/Adoucisseur/DeleteAdoucisseur?id=' + composantId);
  }


  update() {
    return this.http.put(environment.ChaudiereMicroservice + '/Adoucisseur/PutAdoucisseur', this.AddOrUpdateForm.value);
  }

  post() {
    return this.http.post(environment.ChaudiereMicroservice + '/Adoucisseur/AddAdoucisseur', this.AddOrUpdateForm.value);
  }
}
