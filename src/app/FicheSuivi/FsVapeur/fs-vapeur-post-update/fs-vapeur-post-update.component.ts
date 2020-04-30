import { Component, OnInit } from '@angular/core';
import { FsVapeurService } from 'src/app/shared/FicheSuivi/Fs_Vapeur/fs-vapeur.service';
import { MatSnackBar } from '@angular/material';
import { FsVapeur } from 'src/app/shared/FicheSuivi/Fs_Vapeur/fs-vapeur.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Validators } from '@angular/forms';
import { Chaudiere } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.model';
import { ChaudiereService } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.service';

@Component({
  selector: 'app-fs-vapeur-post-update',
  templateUrl: './fs-vapeur-post-update.component.html',
  styles: []
})
export class FsVapeurPostUpdateComponent implements OnInit {

  ListUniteCombustible: any[] = [{ text: 'm3', value: 0 }, { text: 'Nm3', value: 1 }, { text: 'Kg', value: 2 }]
  IndexProductionChecked : boolean = true;
  IndexEauChecked : boolean = true ;
  IndexElectriciteChecked : boolean = true ;
  IndexCombustibleChecked : boolean = true ;
  ListChaudiere: Chaudiere[];
  constructor(public bsModalRef: BsModalRef, private fsVapeurService: FsVapeurService, private _snackBar: MatSnackBar,
    private chaudiereService : ChaudiereService) { }

  ngOnInit() {
    this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexVapeur.setValidators([Validators.required,Validators.min(0)])
    this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexEauAdoucie.setValidators([Validators.required,Validators.min(0)])
    this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexElectricite.setValidators([Validators.required,Validators.min(0)])
    this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexCombustible.setValidators([Validators.required,Validators.min(0)])
    this.fsVapeurService.compteurCombustibleChanged = false;
    this.fsVapeurService.compteurEauChanged = false;
    this.fsVapeurService.compteurElectricityChanged = false;
    this.fsVapeurService.compteurProductionChanged = false;
    this.fsVapeurService.AddOrUpdateFsVapeurForm.markAsUntouched();
debugger
    //#region desactiver les champs index en cas ou l'index est null pour 'update'
    if (this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexEauAdoucie.value == null ){
      this.IndexEauChecked = false
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexEauAdoucie.clearValidators()
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexEauAdoucie.updateValueAndValidity()
    }
    if (this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexVapeur.value == null ){
      this.IndexProductionChecked = false
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexVapeur.clearValidators()
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexVapeur.updateValueAndValidity()
    }
    if (this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexElectricite.value == null ){
      this.IndexElectriciteChecked = false
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexElectricite.clearValidators()
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexElectricite.updateValueAndValidity()
    }
    if (this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexCombustible.value == null ){
      this.IndexCombustibleChecked = false
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexCombustible.clearValidators()
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexCombustible.updateValueAndValidity()
    }
    //#endregion

    this.chaudiereService.getListChaudiereDto().subscribe(res => {
      this.ListChaudiere = res as Chaudiere[]
    })

  }

  onSubmit() {
    if(!this.IndexEauChecked){
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexEauAdoucie.setValue(null);
    }
    if(!this.IndexProductionChecked){
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexVapeur.setValue(null);
    }
    if(!this.IndexElectriciteChecked){
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexElectricite.setValue(null);
    }
    if(!this.IndexCombustibleChecked){
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexCombustible.setValue(null);
    }

    this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.uniteCombustible.setValue(Number(this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.uniteCombustible.value))
    if (
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.ficheSuiviId.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.PostFsVapeur();
    } else {
      this.UpdateFsVapeur();
    }
  }

  PostFsVapeur() {
    this.fsVapeurService.postFsVapeur().subscribe(res => {
       if (res as FsVapeur) {
        if ((res as FsVapeur).msg == "index du production vapeur inférieur au précédent"){
          this._snackBar.open("index du production vapeur inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        } 
        else if ((res as FsVapeur).msg == "index combustible inférieur au précédent") {
          this._snackBar.open("Index combustible inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }
        else if ((res as FsVapeur).msg == "index d'eau adoucie inférieur au précédent"){
          this._snackBar.open("index d'eau adoucie inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }
        else if ((res as FsVapeur).msg == "index de consommation d'éléctricité inférieur au précédent"){
          this._snackBar.open("index de consommation d'éléctricité inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }
        else {
          this.bsModalRef.hide();
          this.fsVapeurService.getListFsVapeurByDate(this.fsVapeurService.DateForm.controls.dateSaisie.value).subscribe(res => {
            this.fsVapeurService.ListFsVapeur = res as FsVapeur[]
          })
          this._snackBar.open("L'ajout est effectué avec succées", "X", {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: ["green-snackbar"]
          });
        }
      }
    },
      err => {
        console.log(err)

        this._snackBar.open("Erreur", "X", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: "right",
          panelClass: ["red-snackbar"]
        });
      }


    )
  }

  UpdateFsVapeur() {

    this.fsVapeurService.updateFsVapeur().subscribe(res => {
      if (res as FsVapeur) {
        if ((res as FsVapeur).msg == "index du production vapeur inférieur au précédent"){
          this._snackBar.open("index du production vapeur inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        } 
        else if ((res as FsVapeur).msg == "index combustible inférieur au précédent") {
          this._snackBar.open("Index combustible inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }
        else if ((res as FsVapeur).msg == "index d'eau adoucie inférieur au précédent"){
          this._snackBar.open("index d'eau adoucie inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }
        else if ((res as FsVapeur).msg == "index de consommation d'éléctricité inférieur au précédent"){
          this._snackBar.open("index de consommation d'éléctricité inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }
        else {
          this.bsModalRef.hide();
          this.fsVapeurService.getListFsVapeurByDate(this.fsVapeurService.DateForm.controls.dateSaisie.value).subscribe(res => {
            this.fsVapeurService.ListFsVapeur = res as FsVapeur[]
          })
          this._snackBar.open(" La modification est effectuée avec succées", "X", {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: ["green-snackbar"]
          });
        }
      }
    },
      err => {
        console.log(err)
        this._snackBar.open('Erreur', "X", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: "right",
          panelClass: ["red-snackbar"]
        });
      }


    )
  }
  OnchangeCompteurCombustible(event) {
    this.fsVapeurService.compteurCombustibleChanged = event;
  }
  OnchangeCompteurEau(event) {
    this.fsVapeurService.compteurEauChanged = event;
  }
  OnchangeCompteurElectricite(event) {
    this.fsVapeurService.compteurElectricityChanged = event;
  }
  OnchangeCompteurProduction(event) {
    this.fsVapeurService.compteurProductionChanged = event;
  }

  OnCheckIndexProduction(event){
    this.IndexProductionChecked = event 
    if (!this.IndexProductionChecked) {
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexVapeur.clearValidators()
    }
    else {
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexVapeur.setValidators([Validators.required,Validators.min(0)])
    }
    this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexVapeur.updateValueAndValidity()
  

  }

  OnCheckIndexEau(event){
    this.IndexEauChecked = event 
    if (!this.IndexEauChecked) {
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexEauAdoucie.clearValidators()
    }
    else {
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexEauAdoucie.setValidators([Validators.required,Validators.min(0)])
    }
    this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexEauAdoucie.updateValueAndValidity()
  }


  OnCheckIndexElectricite(event){
    debugger
    this.IndexElectriciteChecked = event 
    if (!this.IndexElectriciteChecked) {
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexElectricite.clearValidators()
    }
    else {
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexElectricite.setValidators([Validators.required,Validators.min(0)])
    }
    this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexElectricite.updateValueAndValidity()
  }


  OnCheckIndexCombustible(event){
    this.IndexCombustibleChecked = event 
    if (!this.IndexCombustibleChecked) {
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexCombustible.clearValidators()
    }
    else {
      this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexCombustible.setValidators([Validators.required,Validators.min(0)])
    }
    this.fsVapeurService.AddOrUpdateFsVapeurForm.controls.indexCombustible.updateValueAndValidity()
  }


  scroll() {
    // window.
  }


}