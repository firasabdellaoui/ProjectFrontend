import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FsHuileThermiqueService } from 'src/app/shared/FicheSuivi/Fs_HuileThermique/fs-huile-thermique.service';
import { MatSnackBar } from '@angular/material';
import { FsHuileThermique } from 'src/app/shared/FicheSuivi/Fs_HuileThermique/fs-huile-thermique.model';
import { Validators } from '@angular/forms';
import { ChaudiereService } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.service';
import { Chaudiere, ChaudiereForGet } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.model';

@Component({
  selector: 'app-fs-huile-thermique-post-update',
  templateUrl: './fs-huile-thermique-post-update.component.html',
  styles: []
})
export class FsHuileThermiquePostUpdateComponent implements OnInit {
  DifferenceChecked: boolean = false;
  IndexCombustibleChecked : boolean = true ;
  ListChaudiere: ChaudiereForGet[];
  ListUniteCombustible: any[] = [{ text: 'm3', value: 0 }, { text: 'Nm3', value: 1 }, { text: 'Kg', value: 2 }]
  constructor(public bsModalRef: BsModalRef, private fsHuileThermiqueService: FsHuileThermiqueService, private _snackBar: MatSnackBar,
    private chaudiereService : ChaudiereService) { }

  ngOnInit() {
    this.fsHuileThermiqueService.CompteurChanged = false;
    this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.markAsUntouched()
    this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.differentiellePressionHT.clearValidators()
    
    this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.indexCombustibleHT.setValidators([Validators.required,Validators.min(0)])
  
    //#region desactiver les champs index en cas ou l'index est null pour 'update'
  if (this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.indexCombustibleHT.value == null ){
    this.IndexCombustibleChecked = false
    this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.indexCombustibleHT.clearValidators()
    this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.indexCombustibleHT.updateValueAndValidity()
  }
  //#endregion

  this.chaudiereService.getListChaudiereDto().subscribe(res => {
    debugger
    this.ListChaudiere = (res as ChaudiereForGet[]).filter(x=>x.typeChaudiere == "Huile thermique")
  })

  
  }

  onSubmit() {
    if(!this.IndexCombustibleChecked){
      this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.indexCombustibleHT.setValue(null);
    }
    if (!this.DifferenceChecked) {
      this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.differentiellePressionHT.setValue(
        this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.pressionSortiePrimaireHT.value - this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.pressionEntreePrimaireHT.value)
    }
    this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.uniteCombustible.setValue(Number(this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.uniteCombustible.value))
    if (
      this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.ficheSuiviId.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.PostFsHuileThermique();
    } else {
      this.UpdateFsHuileThermique();
    }
  }


  PostFsHuileThermique() {
    this.fsHuileThermiqueService.postFsHuileThermique().subscribe(res => {
      if (res as FsHuileThermique) {
        if ((res as FsHuileThermique).msg == "index combustible inférieur au précédent") {
          this._snackBar.open("Index combustible inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }

        else {
          this.bsModalRef.hide();
          this.fsHuileThermiqueService.getListFsHuileThermiqueByDate(this.fsHuileThermiqueService.DateForm.controls.dateSaisie.value).subscribe(res => {
            this.fsHuileThermiqueService.ListFsHuileThermique = res as FsHuileThermique[]
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
      })

  }

  UpdateFsHuileThermique() {
    this.fsHuileThermiqueService.updateFsHuileThermique().subscribe(res => {
      if (res as FsHuileThermique) {
        if ((res as FsHuileThermique).msg == "index combustible inférieur au précédent") {
          this._snackBar.open("Index combustible inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }

        else {
          this.bsModalRef.hide();
          this.fsHuileThermiqueService.getListFsHuileThermiqueByDate(this.fsHuileThermiqueService.DateForm.controls.dateSaisie.value).subscribe(res => {
            this.fsHuileThermiqueService.ListFsHuileThermique = res as FsHuileThermique[]
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

  OnCheck(event) {
    debugger
    this.DifferenceChecked = event;
    if (this.DifferenceChecked) {
      this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.differentiellePressionHT.setValidators([Validators.required])
    }
    else {
      this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.differentiellePressionHT.clearValidators()
    }
    this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.differentiellePressionHT.updateValueAndValidity()
  }

  OnchangeCompteur(event) {
    this.fsHuileThermiqueService.CompteurChanged = event;
  }

  OnCheckIndexCombustible(event){
    this.IndexCombustibleChecked = event 
    if (!this.IndexCombustibleChecked) {
      this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.indexCombustibleHT.clearValidators()
    }
    else {
      this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.indexCombustibleHT.setValidators([Validators.required,Validators.min(0)])
    }
    this.fsHuileThermiqueService.AddOrUpdateFsHuileThermiqueForm.controls.indexCombustibleHT.updateValueAndValidity()
  }
}

