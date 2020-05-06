import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FsRecuperationService } from 'src/app/shared/FicheSuivi/Fs_Recuperation/fs-recuperation.service';
import { MatSnackBar } from '@angular/material';
import { FsRecuperation } from 'src/app/shared/FicheSuivi/Fs_Recuperation/fs-recuperation.model';
import { Validators } from '@angular/forms';
import { Chaudiere, ChaudiereForGet } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.model';
import { ChaudiereService } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.service';


@Component({
  selector: 'app-fs-recuperation-post-update',
  templateUrl: './fs-recuperation-post-update.component.html',
  styles: []
})
export class FsRecuperationPostUpdateComponent implements OnInit {

  IndexProductionChecked : boolean = true;
  IndexEauChecked : boolean = true ;
  ListChaudiere: ChaudiereForGet[];
  constructor(public bsModalRef: BsModalRef, private fsRecuperationService: FsRecuperationService, private _snackBar: MatSnackBar,
    private chaudiereService : ChaudiereService) { }

  ngOnInit() {

    this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexVapeur.setValidators([Validators.required,Validators.min(0)])
    this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexEauAdoucie.setValidators([Validators.required,Validators.min(0)])

    this.fsRecuperationService.AddOrUpdateFsRecuperationForm.markAsUntouched()
    this.fsRecuperationService.compteurEauChanged = false;
    this.fsRecuperationService.compteurProductionChanged = false;
  
  //#region desactiver les champs index en cas ou l'index est null pour 'update'
  if (this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexEauAdoucie.value == null ){
    this.IndexEauChecked = false
    this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexEauAdoucie.clearValidators()
    this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexEauAdoucie.updateValueAndValidity()
  }
  if (this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexVapeur.value == null ){
    this.IndexProductionChecked = false
    this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexVapeur.clearValidators()
    this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexVapeur.updateValueAndValidity()
  }
  //#endregion
  this.chaudiereService.getListChaudiereDto().subscribe(res => {
    this.ListChaudiere = (res as ChaudiereForGet[]).filter(x=>x.typeChaudiere=="Récupération")
  })

  }



  onSubmit() {
    if(!this.IndexEauChecked){
      this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexEauAdoucie.setValue(null);
    }
    if(!this.IndexProductionChecked){
      this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexVapeur.setValue(null);
    }
    if (
      this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.ficheSuiviId.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.PostFsEauChaude();
    } else {
      this.UpdateFsEauChaude();
    }
  }


  PostFsEauChaude() {
    this.fsRecuperationService.postFsRecuperation().subscribe(res => {
      if (res as FsRecuperation) {
        if ((res as FsRecuperation).msg == "index du production vapeur inférieur au précédent"){
          this._snackBar.open("index du production vapeur inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        } 
        else if ((res as FsRecuperation).msg == "index d'eau adoucie inférieur au précédent"){
          this._snackBar.open("index d'eau adoucie inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }
      else {
       this.bsModalRef.hide();
        this.fsRecuperationService.getListFsRecuperationByDate(this.fsRecuperationService.DateForm.controls.dateSaisie.value).subscribe(res => {
          this.fsRecuperationService.ListFsRecuperation = res as FsRecuperation[]
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

  UpdateFsEauChaude() {
    this.fsRecuperationService.updateFsRecuperation().subscribe(res => {
      if (res as FsRecuperation ) {
        if ((res as FsRecuperation).msg == "index du production vapeur inférieur au précédent"){
          this._snackBar.open("index du production vapeur inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        } 
        else if ((res as FsRecuperation).msg == "index d'eau adoucie inférieur au précédent"){
          this._snackBar.open("index d'eau adoucie inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }
      else {
       this.bsModalRef.hide();
        this.fsRecuperationService.getListFsRecuperationByDate(this.fsRecuperationService.DateForm.controls.dateSaisie.value).subscribe(res => {
          this.fsRecuperationService.ListFsRecuperation = res as FsRecuperation[]
        })
        this._snackBar.open("La modification est effectuée avec succées", "X", {
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

  OnchangeCompteurEau(event) {
    this.fsRecuperationService.compteurEauChanged = event;
  }

  OnchangeCompteurProduction(event) {
    this.fsRecuperationService.compteurProductionChanged = event;
  }

  OnCheckIndexProduction(event){
    this.IndexProductionChecked = event 
    if (!this.IndexProductionChecked) {
      this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexVapeur.clearValidators()
    }
    else {
      this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexVapeur.setValidators([Validators.required,Validators.min(0)])
    }
    this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexVapeur.updateValueAndValidity()
  

  }

  OnCheckIndexEau(event){
    this.IndexEauChecked = event 
    if (!this.IndexEauChecked) {
      this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexEauAdoucie.clearValidators()
    }
    else {
      this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexEauAdoucie.setValidators([Validators.required,Validators.min(0)])
    }
    this.fsRecuperationService.AddOrUpdateFsRecuperationForm.controls.indexEauAdoucie.updateValueAndValidity()
  }
}