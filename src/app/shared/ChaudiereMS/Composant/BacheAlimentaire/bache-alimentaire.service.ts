import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { BacheAlimentaire } from '../composant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BacheAlimentaireService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }
  BacheAlimentaireList: BacheAlimentaire[];

  AddOrUpdateForm = this.fb.group({
    type: [''],
    volume: [''],
    composantId: [''],
    dateAcquisition: [''],
    prixAcquisition: [''],
    etat: [''],
    chaudiereId: [''],
  });

  initializeAddOrUpdateFormForAdd() {
    this.AddOrUpdateForm.setValue({
      volume: '',
      type: '',
      composantId: '00000000-0000-0000-0000-000000000000',
      dateAcquisition: '',
      prixAcquisition: '',
      etat: '',
      chaudiereId: '00000000-0000-0000-0000-000000000000'
    });
  }

  initializeAddOrUpdateFormForUpdate(bacheAlimentaire: BacheAlimentaire) {
    this.AddOrUpdateForm.setValue({
      volume: bacheAlimentaire.volume,
      type: bacheAlimentaire.type,
      composantId: bacheAlimentaire.composantId,
      dateAcquisition: bacheAlimentaire.dateAcquisition,
      prixAcquisition: bacheAlimentaire.prixAcquisition,
      etat: bacheAlimentaire.etat,
      chaudiereId: bacheAlimentaire.chaudiereId
    });
  }


  getList() {
    return this.http.get(environment.ChaudiereMicroservice + '/BacheAlimentaire');
  }

  getById(composantId: string) {
    return this.http.get(environment.ChaudiereMicroservice + '/BacheAlimentaire/id?id=' + composantId);
  }


  delete(composantId: string) {
    return this.http.delete(environment.ChaudiereMicroservice + '/BacheAlimentaire/DeleteBacheAlimentaire?id=' + composantId);
  }


  update() {
    return this.http.put(environment.ChaudiereMicroservice + '/BacheAlimentaire/PutBacheAlimentaire', this.AddOrUpdateForm.value);
  }

  post() {
    return this.http.post(environment.ChaudiereMicroservice + '/BacheAlimentaire/AddBacheAlimentaire', this.AddOrUpdateForm.value);
  }
}
