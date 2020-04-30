import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {PompeAlimentaire} from '../composant.model';
import {Chaudiere} from '../../Chaudiere/chaudiere.model';
import {FsEauChaude} from '../../../FicheSuivi/Fs_EauChaude/fs-eau-chaude.model';

@Injectable({
  providedIn: 'root'
})
export class PompeAlimentaireService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }
  PompeAlimentaireList: PompeAlimentaire[];

  AddOrUpdateForm = this.fb.group({
    composantId: [''],
    chaudiereId: [''],
    puissanceElectrique: [''],
    dateAcquisition: [''],
    prixAcquisition: [''],
    etat: ['']
  });

  initializeAddOrUpdateFormForAdd() {
    this.AddOrUpdateForm.setValue({
      composantId: '00000000-0000-0000-0000-000000000000',
      chaudiereId: '00000000-0000-0000-0000-000000000000',
      puissanceElectrique: '',
      dateAcquisition: '',
      prixAcquisition: '',
      etat: ''
    });
  }

  initializeAddOrUpdateFormForUpdate(pompeAlimentaire: PompeAlimentaire) {
    this.AddOrUpdateForm.setValue({
      composantId: pompeAlimentaire.composantId,
      chaudiereId: pompeAlimentaire.chaudiereId,
      puissanceElectrique: pompeAlimentaire.puissanceElectrique,
      dateAcquisition: pompeAlimentaire.dateAcquisition,
      prixAcquisition: pompeAlimentaire.prixAcquisition,
      etat: pompeAlimentaire.etat
    });
  }


  getListPompeAlimentaire() {
    return this.http.get(environment.ChaudiereMicroservice + '/PompeAlimentaire');
  }

  getPompeAlimentaireById(chaudiereId: string) {
    return this.http.get(environment.ChaudiereMicroservice + '/PompeAlimentaire/id?id=' + chaudiereId);
  }


  deletePompeAlimentaire(chaudiereId: string) {
    return this.http.delete(environment.ChaudiereMicroservice + '/PompeAlimentaire/DeletePompeAlimentaire?id=' + chaudiereId);
  }


  updatePompeAlimentaire() {
    return this.http.put(environment.ChaudiereMicroservice + '/PompeAlimentaire/PutPompeAlimentaire', this.AddOrUpdateForm.value);
  }

  postPompeAlimentaire() {
    return this.http.post(environment.ChaudiereMicroservice + '/PompeAlimentaire/AddPompeAlimentaire', this.AddOrUpdateForm.value);
  }
}
