import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { FsVapeur } from './fs-vapeur.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FsVapeurService {
  DateForm = this.fb.group({
    dateSaisie : ['',]
  })
  
  AddOrUpdateFsVapeurForm = this.fb.group({
    ficheSuiviId: [''],
    fkChaudiere: ['',Validators.required],
    dateSaisie: ['', Validators.required],
    productionUsine : ['',[Validators.required,Validators.min(0)]],
    indexVapeur: [''],
    indexEauAdoucie: [''],
    indexCombustible: [''],
    indexElectricite: [''],
    temperatureFumee: ['', Validators.required],
    tH_Eau_Chaudiere: ['',[Validators.required,Validators.min(0)]],
    pH_Eau_Chaudiere: ['',[Validators.required,Validators.min(0),Validators.max(14)]],
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
    uniteCombustible : ['', Validators.required]
  })

  ListFsVapeur: FsVapeur[]
  compteurCombustibleChanged : boolean ;
  compteurEauChanged : boolean ;
  compteurElectricityChanged: boolean ;
  compteurProductionChanged: boolean ;
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  initializeAddOrUpdateFsVapeurFormForAdd() {
    this.AddOrUpdateFsVapeurForm.setValue({
      ficheSuiviId: '00000000-0000-0000-0000-000000000000',
      dateSaisie: '',
      fkChaudiere: '',
      productionUsine : '',
      indexVapeur: '',
      indexEauAdoucie: '',
      indexCombustible: '',
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
      commentaire : 'RAS',
      uniteCombustible : '',
      indexElectricite : ''
    })
  }

  initializeAddOrUpdateFsVapeurFormForUpdate(fsVapeur : FsVapeur) {
    this.AddOrUpdateFsVapeurForm.setValue({
      ficheSuiviId: fsVapeur.ficheSuiviId,
      dateSaisie: fsVapeur.dateSaisie,
      fkChaudiere: fsVapeur.fkChaudiere,
      productionUsine : fsVapeur.productionUsine,
      indexVapeur: fsVapeur.indexVapeur,
      indexEauAdoucie: fsVapeur.indexEauAdoucie,
      indexCombustible: fsVapeur.indexCombustible,
      temperatureFumee: fsVapeur.temperatureFumee,
      tH_Eau_Chaudiere: fsVapeur.tH_Eau_Chaudiere,
      pH_Eau_Chaudiere: fsVapeur.pH_Eau_Chaudiere,
      conductivite_Eau_Chaudiere: fsVapeur.conductivite_Eau_Chaudiere,
      temperatureBacheAlimentaire: fsVapeur.temperatureBacheAlimentaire,
      tH_Eau_BacheAlimentaire: fsVapeur.tH_Eau_BacheAlimentaire,
      conductivite_Eau_BacheAlimentaire: fsVapeur.conductivite_Eau_BacheAlimentaire,
      pH_Eau_BacheAlimentaire: fsVapeur.pH_Eau_BacheAlimentaire,
      tHe_Eau_Adoucie: fsVapeur.tHe_Eau_Adoucie,
      tHs_Eau_Adoucie: fsVapeur.tHs_Eau_Adoucie,
      pH_Eau_Adoucie: fsVapeur.pH_Eau_Adoucie,
      conductivite_Eau_Adoucie: fsVapeur.conductivite_Eau_Adoucie,
      ph_RetourCondensat: fsVapeur.ph_RetourCondensat,
      conductivite_RetourCondensat: fsVapeur.conductivite_RetourCondensat,
      commentaire : fsVapeur.commentaire,
      uniteCombustible : fsVapeur.uniteCombustible,
      indexElectricite : fsVapeur.indexElectricite
    })
 
  }

  getListFsVapeur() {
    return this.http.get(environment.FicheSuiviMicroservice + "/FSVapeur/GetListFsVapeur")
  }

  deleteFsVapeur(ficheSuiviId: string) {
    return this.http.delete(environment.FicheSuiviMicroservice + "/FSVapeur/DeleteFsVapeur?Id=" + ficheSuiviId)
  }

  postFsVapeur() {
    return this.http.post(environment.FicheSuiviMicroservice + "/FSVapeur/AddFsVapeur?compteurCombustibleChanged="
    + this.compteurCombustibleChanged + "&compteurEauChanged=" + this.compteurEauChanged + "&compteurElectricityChanged=" + this.compteurElectricityChanged 
    +"&compteurProductionChanged=" + this.compteurProductionChanged, this.AddOrUpdateFsVapeurForm.value )
  }

  updateFsVapeur() {
    return this.http.put(environment.FicheSuiviMicroservice + "/FSVapeur/UpdateFsVapeur?compteurCombustibleChanged="
    + this.compteurCombustibleChanged + "&compteurEauChanged=" + this.compteurEauChanged + "&compteurElectricityChanged=" + this.compteurElectricityChanged 
    +"&compteurProductionChanged=" + this.compteurProductionChanged, this.AddOrUpdateFsVapeurForm.value)
  }

  getListFsVapeurByDate(date : string ){
    return this.http.get(environment.FicheSuiviMicroservice + "/FSVapeur/GetListFsVapeurByDate?date="+ date)
  }

  getDate(){
    return this.http.get(environment.FicheSuiviMicroservice + "/FSVapeur/Date" , { responseType: 'text' })
  }
}
