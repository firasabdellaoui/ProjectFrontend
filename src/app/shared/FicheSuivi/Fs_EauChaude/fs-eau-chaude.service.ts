import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { FsEauChaude } from './fs-eau-chaude.model';

@Injectable({
  providedIn: 'root'
})
export class FsEauChaudeService {
  DateForm = this.fb.group({
    dateSaisie : ['',]
  })

  AddOrUpdateFsEauChaudeForm = this.fb.group({
    ficheSuiviId: [''],
    fkChaudiere: ['',Validators.required],
    dateSaisie: ['',Validators.required],
    productionUsine: ['',[Validators.required,Validators.min(0)]],
    indexCombustible: [''],
    th: ['',[Validators.required,Validators.min(0)]],
    ph: ['',[Validators.required,Validators.min(0),,Validators.max(14)]],
    temperatureFumee: ['',Validators.required],
    temperatureConsigneBrulure: ['',Validators.required],
    pressionDepart: ['',[Validators.required,Validators.min(0)]],
    pressionRetour: ['',[Validators.required,Validators.min(0)]],
    temperatureDepart: ['',Validators.required],
    temperatureRetour: ['',Validators.required],
    tH_EauBrute: ['',[Validators.required,Validators.min(0)]],
    pH_EauBrute: ['',[Validators.required,Validators.min(0),,Validators.max(14)]],
    commentaire: ['',Validators.required],
    differencePression: [''],
    uniteCombustible : ['',Validators.required]
  })

  ListFsEauChaude: FsEauChaude[]
  CompteurChanged : boolean ;
  constructor(private http: HttpClient, private fb: FormBuilder) { }


  initializeAddOrUpdateFsEauChaudeFormFormForAdd() {
    this.AddOrUpdateFsEauChaudeForm.setValue({
      ficheSuiviId: '00000000-0000-0000-0000-000000000000',
      fkChaudiere: '',
      dateSaisie: '',
      productionUsine: '',
      indexCombustible: '',
      th: '',
      ph: '',
      temperatureFumee: '',
      temperatureConsigneBrulure: '',
      pressionDepart: '',
      pressionRetour: '',
      temperatureDepart: '',
      temperatureRetour: '',
      tH_EauBrute: '',
      pH_EauBrute: '',
      commentaire: 'RAS',
      differencePression : '',
      uniteCombustible :''
    })
  }

  initializeAddOrUpdateFsEauChaudeFormFormForUpdate(fsEauChaude : FsEauChaude) {
    this.AddOrUpdateFsEauChaudeForm.setValue({
      ficheSuiviId: fsEauChaude.ficheSuiviId,
      fkChaudiere: fsEauChaude.fkChaudiere,
      dateSaisie: fsEauChaude.dateSaisie,
      productionUsine: fsEauChaude.productionUsine,
      indexCombustible: fsEauChaude.indexCombustible,
      th: fsEauChaude.th,
      ph: fsEauChaude.ph,
      temperatureFumee: fsEauChaude.temperatureFumee,
      temperatureConsigneBrulure: fsEauChaude.temperatureConsigneBrulure,
      pressionDepart: fsEauChaude.pressionDepart,
      pressionRetour: fsEauChaude.pressionRetour,
      temperatureDepart: fsEauChaude.temperatureDepart,
      temperatureRetour: fsEauChaude.temperatureRetour,
      tH_EauBrute: fsEauChaude.tH_EauBrute,
      pH_EauBrute: fsEauChaude.pH_EauBrute,
      commentaire: fsEauChaude.commentaire,
      differencePression : fsEauChaude.differencePression,
      uniteCombustible : fsEauChaude.uniteCombustible
    })
  }

  getListFsEauChaude() {
    return this.http.get(environment.FicheSuiviMicroservice + "/FSEauChaude/GetListFsEauChaude")
  }

  deleteFsEauChaude(ficheSuiviId: string) {
    return this.http.delete(environment.FicheSuiviMicroservice + "/FSEauChaude/DeleteFsEauChaude?Id=" + ficheSuiviId)
  }

  postFsEauChaude() {
    return this.http.post(environment.FicheSuiviMicroservice + "/FSEauChaude/AddFsEauChaude?compteurChanged=" + this.CompteurChanged, this.AddOrUpdateFsEauChaudeForm.value)
  }

  updateFsEauChauude(){
    return this.http.put(environment.FicheSuiviMicroservice + "/FSEauChaude/UpdateFsEauChaude?compteurChanged=" + this.CompteurChanged, this.AddOrUpdateFsEauChaudeForm.value)
  }

  getListFsEauChaudeByDate(date : string ){
    return this.http.get(environment.FicheSuiviMicroservice + "/FSEauChaude/GetListFsEauChaudeByDate?date="+ date)
  }

  getDate(){
    return this.http.get(environment.FicheSuiviMicroservice + "/FSEauChaude/Date" , { responseType: 'text' })
  }
}
