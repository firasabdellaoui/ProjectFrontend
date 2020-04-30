import { Component, OnInit, NgZone } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FsEauChaudeService } from 'src/app/shared/FicheSuivi/Fs_EauChaude/fs-eau-chaude.service';
import { FsEauChaude } from 'src/app/shared/FicheSuivi/Fs_EauChaude/fs-eau-chaude.model';
import { MatSnackBar } from '@angular/material';
import { Validators } from '@angular/forms';
import { ChaudiereForGet, Chaudiere } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.model';
import { ChaudiereService } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.service';

@Component({
  selector: 'app-fs-eau-chude-post-update',
  templateUrl: './fs-eau-chude-post-update.component.html',
  styles: []
})
export class FsEauChudePostUpdateComponent implements OnInit {

  DifferenceChecked: boolean = false;
  IndexCombustibleChecked: boolean = true;

  ListUniteCombustible: any[] = [{ text: 'm3', value: 0 }, { text: 'Nm3', value: 1 }, { text: 'Kg', value: 2 }]
  ListChaudiere: Chaudiere[];

  constructor(public bsModalRef: BsModalRef,
    private fsEauChaudeService: FsEauChaudeService,
    private _snackBar: MatSnackBar,
    private chaudiereService: ChaudiereService) { }

  ngOnInit() {
    this.fsEauChaudeService.CompteurChanged = false;
    this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.markAsUntouched();
    this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.differencePression.clearValidators()

    this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.indexCombustible.setValidators([Validators.required, Validators.min(0)])

    //#region desactiver les champs index en cas ou l'index est null pour 'update'
    if (this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.indexCombustible.value == null) {
      this.IndexCombustibleChecked = false
      this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.indexCombustible.clearValidators()
      this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.indexCombustible.updateValueAndValidity()
    }
    //#endregion

    this.chaudiereService.getListChaudiereDto().subscribe(res => {
      this.ListChaudiere = res as Chaudiere[]
    })

  }





  onSubmit() {
    if (!this.IndexCombustibleChecked) {
      this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.indexCombustible.setValue(null);
    }
    if (!this.DifferenceChecked) {
      this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.differencePression.setValue(this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.pressionRetour.value - this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.pressionDepart.value)
    }
    this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.uniteCombustible.setValue(Number(this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.uniteCombustible.value))
    if (
      this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.ficheSuiviId.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.PostFsEauChaude();
    } else {
      this.UpdateFsEauChaude();
    }
  }


  PostFsEauChaude() {
    this.fsEauChaudeService.postFsEauChaude().subscribe(res => {

      if (res as FsEauChaude) {
        if ((res as FsEauChaude).msg == "index combustible inférieur au précédent") {
          this._snackBar.open("Index combustible inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }

        else {
          this.bsModalRef.hide();
          this.fsEauChaudeService.getListFsEauChaudeByDate(this.fsEauChaudeService.DateForm.controls.dateSaisie.value).subscribe(res => {
            this.fsEauChaudeService.ListFsEauChaude = res as FsEauChaude[]
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
    this.fsEauChaudeService.updateFsEauChauude().subscribe(res => {
      if (res as FsEauChaude) {
        if ((res as FsEauChaude).msg == "index combustible inférieur au précédent") {
          this._snackBar.open("Index combustible inférieur au précédent", "X", {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: "right",
            panelClass: ["red-snackbar"]
          });
        }
        else {
          this.bsModalRef.hide();
          this.fsEauChaudeService.getListFsEauChaudeByDate(this.fsEauChaudeService.DateForm.controls.dateSaisie.value).subscribe(res => {
            this.fsEauChaudeService.ListFsEauChaude = res as FsEauChaude[]
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

    this.DifferenceChecked = event;
    if (this.DifferenceChecked) {
      this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.differencePression.setValidators([Validators.required])
    }
    else {
      this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.differencePression.clearValidators()
    }
    this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.differencePression.updateValueAndValidity()
  }


  OnchangeCompteur(event) {
    this.fsEauChaudeService.CompteurChanged = event;
  }

  OnCheckIndexCombustible(event) {
    this.IndexCombustibleChecked = event
    if (!this.IndexCombustibleChecked) {
      this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.indexCombustible.clearValidators()
    }
    else {
      this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.indexCombustible.setValidators([Validators.required, Validators.min(0)])
    }
    this.fsEauChaudeService.AddOrUpdateFsEauChaudeForm.controls.indexCombustible.updateValueAndValidity()
  }
}

