import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { FsRecuperation } from './fs-recuperation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FsRecuperationService {
  DateForm = this.fb.group({
    dateSaisie : ['',]
  })
  
  AddOrUpdateFsRecuperationForm = this.fb.group({
    ficheSuiviId: [''],
    fkChaudiere: ['',Validators.required],
    dateSaisie: ['', Validators.required],
    indexVapeur: [''],
    indexEauAdoucie: [''],
    temperatureFumee: ['', Validators.required],
    tH_Eau_Chaudiere: ['',[Validators.required,Validators.min(0)]],
    pH_Eau_Chaudiere: ['',[Validators.required,Validators.min(0),,Validators.max(14)]],
    conductivite_Eau_Chaudiere: ['',[Validators.required,Validators.min(0)]],
    temperatureBacheAlimentaire: ['', Validators.required],
    tH_Eau_BacheAlimentaire: ['',[Validators.required,Validators.min(0)]],
    conductivite_Eau_BacheAlimentaire: ['',[Validators.required,Validators.min(0)]],
    pH_Eau_BacheAlimentaire: ['',[Validators.required,Validators.min(0),,Validators.max(14)]],
    tHe_Eau_Adoucie: ['',[Validators.required,Validators.min(0)]],
    tHs_Eau_Adoucie: ['',[Validators.required,Validators.min(0)]],
    pH_Eau_Adoucie: ['',[Validators.required,Validators.min(0),,Validators.max(14)]],
    conductivite_Eau_Adoucie: ['',[Validators.required,Validators.min(0)]],
    ph_RetourCondensat: ['',[Validators.required,Validators.min(0),,Validators.max(14)]],
    conductivite_RetourCondensat: ['',[Validators.required,Validators.min(0)]],
    commentaire: ['', Validators.required],
  })

  ListFsRecuperation: FsRecuperation[]
  compteurEauChanged : boolean ;
  compteurProductionChanged: boolean ;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  initializeAddOrUpdateFsRecuperationFormForAdd() {
    this.AddOrUpdateFsRecuperationForm.setValue({
      ficheSuiviId: '00000000-0000-0000-0000-000000000000',
      dateSaisie: '',
      fkChaudiere: '',
      indexVapeur: '',
      indexEauAdoucie: '',
      temperatureFumee: '',
      tH_Eau_Chaudiere: '',
      pH_Eau_Chaudiere: '',
      conductivite_Eau_Chaudiere: '',
      temperatureBacheAlimentaire: '',
      tH_Eau_BacheAlimentaire: '',
      conductivite_Eau_BacheAlimentaire: '',
      pH_Eau_BacheAlimentaire: '',
      tHe_Eau_Adoucie: '',
      tHs_Eau_Adoucie: '',
      pH_Eau_Adoucie: '',
      conductivite_Eau_Adoucie: '',
      ph_RetourCondensat: '',
      conductivite_RetourCondensat: '',
      commentaire : 'RAS'
    })
  }

  initializeAddOrUpdateFsRecuperationFormForUpdate(fsRecuperation : FsRecuperation) {
    this.AddOrUpdateFsRecuperationForm.setValue({
      ficheSuiviId: fsRecuperation.ficheSuiviId,
      dateSaisie: fsRecuperation.dateSaisie,
      fkChaudiere: fsRecuperation.fkChaudiere,
      indexVapeur: fsRecuperation.indexVapeur,
      indexEauAdoucie: fsRecuperation.indexEauAdoucie,
      temperatureFumee: fsRecuperation.temperatureFumee,
      tH_Eau_Chaudiere: fsRecuperation.tH_Eau_Chaudiere,
      pH_Eau_Chaudiere: fsRecuperation.pH_Eau_Chaudiere,
      conductivite_Eau_Chaudiere: fsRecuperation.conductivite_Eau_Chaudiere,
      temperatureBacheAlimentaire: fsRecuperation.temperatureBacheAlimentaire,
      tH_Eau_BacheAlimentaire: fsRecuperation.tH_Eau_BacheAlimentaire,
      conductivite_Eau_BacheAlimentaire: fsRecuperation.conductivite_Eau_BacheAlimentaire,
      pH_Eau_BacheAlimentaire: fsRecuperation.pH_Eau_BacheAlimentaire,
      tHe_Eau_Adoucie: fsRecuperation.tHe_Eau_Adoucie,
      tHs_Eau_Adoucie: fsRecuperation.tHs_Eau_Adoucie,
      pH_Eau_Adoucie: fsRecuperation.pH_Eau_Adoucie,
      conductivite_Eau_Adoucie: fsRecuperation.conductivite_Eau_Adoucie,
      ph_RetourCondensat: fsRecuperation.ph_RetourCondensat,
      conductivite_RetourCondensat: fsRecuperation.conductivite_RetourCondensat,
      commentaire : fsRecuperation.commentaire
    })
  }


  getListFsRecuperation() {
    return this.http.get(environment.FicheSuiviMicroservice + "/FSRecuperation/GetListFsRecuperation")
  }

  deleteFsRecuperation(ficheSuiviId: string) {
    return this.http.delete(environment.FicheSuiviMicroservice + "/FSRecuperation/DeleteFsrecuperation?Id=" + ficheSuiviId)
  }

  postFsRecuperation() {
    return this.http.post(environment.FicheSuiviMicroservice + "/FSRecuperation/AddFsRecuperation?compteurEauChanged=" 
    + this.compteurEauChanged + "&compteurProductionChanged=" + this.compteurProductionChanged, this.AddOrUpdateFsRecuperationForm.value )
  }

  updateFsRecuperation() {
    return this.http.put(environment.FicheSuiviMicroservice + "/FSRecuperation/UpdateFsRecuperation", this.AddOrUpdateFsRecuperationForm.value)
  }
  getListFsRecuperationByDate(date : string ){
    return this.http.get(environment.FicheSuiviMicroservice + "/FSRecuperation/GetListFsRecuperationByDate?date="+ date)
  }

  getDate(){
    return this.http.get(environment.FicheSuiviMicroservice + "/FSRecuperation/Date" , { responseType: 'text' })
  }
}