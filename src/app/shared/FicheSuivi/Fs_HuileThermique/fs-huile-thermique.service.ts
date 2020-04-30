import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { FsHuileThermique } from './fs-huile-thermique.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FsHuileThermiqueService {
  DateForm = this.fb.group({
    dateSaisie : ['',]
  })
  
  AddOrUpdateFsHuileThermiqueForm = this.fb.group({
    ficheSuiviId: [''],
    fkChaudiere: ['',Validators.required],
    dateSaisie: ['', Validators.required],
    productionUsine: ['',[Validators.required,Validators.min(0)]],
    indexCombustibleHT: [''],
    temperatureFumeeHT: ['', Validators.required],
    temperatureConsigneHT: ['', Validators.required],
    temperatureBesoinHT: ['', Validators.required],
    temperatureDepartHuileHT: ['', Validators.required],
    temperatureRetourHuileHT: ['', Validators.required],
    pressionEntreePrimaireHT: ['',[Validators.required,Validators.min(0)]],
    pressionSortiePrimaireHT: ['',[Validators.required,Validators.min(0)]],
    commentaire: ['', Validators.required],
    differentiellePressionHT : [''],
    uniteCombustible: ['', Validators.required],

  })

ListFsHuileThermique : FsHuileThermique[]
CompteurChanged : boolean ;
  constructor(private http: HttpClient, private fb: FormBuilder) { }


  initializeAddOrUpdateFsHuileThermiqueFormFormForAdd() {
    this.AddOrUpdateFsHuileThermiqueForm.setValue({
      ficheSuiviId: '00000000-0000-0000-0000-000000000000',
      fkChaudiere: '',
      dateSaisie: '',
      productionUsine: '',
      indexCombustibleHT: '',
      temperatureFumeeHT: '',
      temperatureConsigneHT: '',
      temperatureBesoinHT: '',
      temperatureDepartHuileHT: '',
      temperatureRetourHuileHT: '',
      pressionEntreePrimaireHT: '',
      pressionSortiePrimaireHT: '',
      commentaire: 'RAS',
      differentiellePressionHT : '',
      uniteCombustible :''
    })
  }

  initializeAddOrUpdateFsHuileThermiqueFormFormForUpdate(fsHuileThermique: FsHuileThermique) {
    this.AddOrUpdateFsHuileThermiqueForm.setValue({
      ficheSuiviId: fsHuileThermique.ficheSuiviId,
      fkChaudiere: fsHuileThermique.fkChaudiere,
      dateSaisie: fsHuileThermique.dateSaisie,
      productionUsine: fsHuileThermique.productionUsine,
      indexCombustibleHT: fsHuileThermique.indexCombustibleHT,
      temperatureFumeeHT: fsHuileThermique.temperatureFumeeHT,
      temperatureConsigneHT: fsHuileThermique.temperatureConsigneHT,
      temperatureBesoinHT: fsHuileThermique.temperatureBesoinHT,
      temperatureDepartHuileHT: fsHuileThermique.temperatureDepartHuileHT,
      temperatureRetourHuileHT: fsHuileThermique.temperatureRetourHuileHT,
      pressionEntreePrimaireHT: fsHuileThermique.pressionEntreePrimaireHT,
      pressionSortiePrimaireHT: fsHuileThermique.pressionSortiePrimaireHT,
      commentaire: fsHuileThermique.commentaire,
      differentiellePressionHT : fsHuileThermique.differentiellePressionHT,
      uniteCombustible : fsHuileThermique.uniteCombustible
    })
  }

  getListFsHuileThermique() {
    return this.http.get(environment.FicheSuiviMicroservice + "/FSHuileThermique/GetListfsHuileThermique")
  }

  deleteFsHuileThermique(ficheSuiviId: string) {
    return this.http.delete(environment.FicheSuiviMicroservice + "/FSHuileThermique/DeletefsHuileThermique?Id=" + ficheSuiviId)
  }

  postFsHuileThermique() {
    return this.http.post(environment.FicheSuiviMicroservice + "/FSHuileThermique/AddfsHuileThermique?compteurChanged=" +this.CompteurChanged, this.AddOrUpdateFsHuileThermiqueForm.value)
  }

  updateFsHuileThermique(){
    return this.http.put(environment.FicheSuiviMicroservice + "/FSHuileThermique/UpdatefsHuileThermique?compteurChanged=" +this.CompteurChanged, this.AddOrUpdateFsHuileThermiqueForm.value)
  }

  getListFsHuileThermiqueByDate(date : string ){
    return this.http.get(environment.FicheSuiviMicroservice + "/FSHuileThermique/GetListfsHuileThermiqueByDate?date="+ date)
  }

  getDate(){
    return this.http.get(environment.FicheSuiviMicroservice + "/FSHuileThermique/Date" , { responseType: 'text' })
  }
}
