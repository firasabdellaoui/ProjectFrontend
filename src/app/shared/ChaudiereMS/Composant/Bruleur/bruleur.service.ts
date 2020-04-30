import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Bruleur } from '../composant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BruleurService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }
  BruleurList: Bruleur[];

  AddOrUpdateForm = this.fb.group({
    marque: [''],
    modele: [''],
    type: [''],
    anneeFabrication: [''],
    puissanceElectrique: [''],
    typeCombustible: [''],
    composantId: [''],
    dateAcquisition: [''],
    prixAcquisition: [''],
    etat: [''],
    chaudiereId: ['']
  });

  initializeAddOrUpdateFormForAdd() {
    this.AddOrUpdateForm.setValue({
      marque: '',
      modele: '',
      type: '',
      anneeFabrication: '',
      puissanceElectrique: '',
      typeCombustible: '',
      composantId: '00000000-0000-0000-0000-000000000000',
      dateAcquisition: '',
      prixAcquisition: '',
      etat: '',
      chaudiereId: '00000000-0000-0000-0000-000000000000'
    });
  }

  initializeAddOrUpdateFormForUpdate(bruleur: Bruleur) {
    this.AddOrUpdateForm.setValue({
      marque: bruleur.marque,
      modele: bruleur.modele,
      type: bruleur.type,
      anneeFabrication: bruleur.anneeFabrication,
      puissanceElectrique: bruleur.puissanceElectrique,
      typeCombustible: bruleur.typeCombustible,
      composantId: bruleur.composantId,
      dateAcquisition: bruleur.dateAcquisition,
      prixAcquisition: bruleur.prixAcquisition,
      etat: bruleur.etat,
      chaudiereId: bruleur.chaudiereId
    });
  }


  getList() {
    return this.http.get(environment.ChaudiereMicroservice + '/Bruleur');
  }

  getById(composantId: string) {
    return this.http.get(environment.ChaudiereMicroservice + '/Bruleur/id?id=' + composantId);
  }


  delete(composantId: string) {
    return this.http.delete(environment.ChaudiereMicroservice + '/Bruleur/DeleteBruleur?id=' + composantId);
  }


  update() {
    return this.http.put(environment.ChaudiereMicroservice + '/Bruleur/PutBruleur', this.AddOrUpdateForm.value);
  }

  post() {
    return this.http.post(environment.ChaudiereMicroservice + '/Bruleur/AddBruleur', this.AddOrUpdateForm.value);
  }
}
