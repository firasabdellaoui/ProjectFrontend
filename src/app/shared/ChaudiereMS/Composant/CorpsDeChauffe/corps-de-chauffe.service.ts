import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CorpsDeChauffe } from '../composant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorpsDeChauffeService {

  constructor(private http: HttpClient, private fb: FormBuilder) { }
  CorpsDeChauffeList: CorpsDeChauffe[];

  AddOrUpdateForm = this.fb.group({
    marque: [''],
    modele: [''],
    dateFabrication: [''],
    puissanceThermique: [''],
    pressionService: [''],
    pressionTimbre: [''],
    temperatureTravail: [''],
    debitVapeur: [''],
    economiseur: [''],
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
      dateFabrication: '',
      puissanceThermique: '',
      pressionService: '',
      pressionTimbre: '',
      temperatureTravail: '',
      debitVapeur: '',
      economiseur: 'true',
      composantId: '00000000-0000-0000-0000-000000000000',
      dateAcquisition: '',
      prixAcquisition: '',
      etat: '',
      chaudiereId: '00000000-0000-0000-0000-000000000000'
    });
  }

  initializeAddOrUpdateFormForUpdate(corpsDeChauffe: CorpsDeChauffe) {
    this.AddOrUpdateForm.setValue({
      marque: corpsDeChauffe.marque,
      modele: corpsDeChauffe.modele,
      dateFabrication: corpsDeChauffe.dateFabrication,
      puissanceThermique: corpsDeChauffe.puissanceThermique,
      pressionService: corpsDeChauffe.pressionService,
      pressionTimbre: corpsDeChauffe.pressionTimbre,
      temperatureTravail: corpsDeChauffe.temperatureTravail,
      debitVapeur: corpsDeChauffe.debitVapeur,
      economiseur: corpsDeChauffe.economiseur,
      composantId: corpsDeChauffe.composantId,
      dateAcquisition: corpsDeChauffe.dateAcquisition,
      prixAcquisition: corpsDeChauffe.prixAcquisition,
      etat: corpsDeChauffe.etat,
      chaudiereId: corpsDeChauffe.chaudiereId
    });
  }


  getList() {
    return this.http.get(environment.ChaudiereMicroservice + '/CorpsDeChauffe');
  }

  getById(composantId: string) {
    return this.http.get(environment.ChaudiereMicroservice + '/CorpsDeChauffe/id?id=' + composantId);
  }


  delete(composantId: string) {
    return this.http.delete(environment.ChaudiereMicroservice + '/CorpsDeChauffe/DeleteCorpsDeChauffe?id=' + composantId);
  }


  update() {
    return this.http.put(environment.ChaudiereMicroservice + '/CorpsDeChauffe/PutCorpsDeChauffe', this.AddOrUpdateForm.value);
  }

  post() {
    return this.http.post(environment.ChaudiereMicroservice + '/CorpsDeChauffe/AddCorpsDeChauffe', this.AddOrUpdateForm.value);
  }
}
