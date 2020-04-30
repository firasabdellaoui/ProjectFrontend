import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FsRecuperationService } from 'src/app/shared/FicheSuivi/Fs_Recuperation/fs-recuperation.service';
import { FsRecuperation } from 'src/app/shared/FicheSuivi/Fs_Recuperation/fs-recuperation.model';
import { FsRecuperationPostUpdateComponent } from '../fs-recuperation-post-update/fs-recuperation-post-update.component';
import { SubsidiaryService } from 'src/app/shared/Subsidiary/subsidiary.service';
import { Subsidiary } from 'src/app/shared/Subsidiary/subsidiary.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fs-recuperation-get-delete',
  templateUrl: './fs-recuperation-get-delete.component.html',
  styles: []
})
export class FsRecuperationGetDeleteComponent implements OnInit {
  SearchByFilialeForm = this.fb.group({
    filiale:["",],
  });

  constructor(private fsRecuperationService : FsRecuperationService,
     private _snackBar: MatSnackBar,
      private modalService: BsModalService,
      private subsidiaryService: SubsidiaryService,
      private fb : FormBuilder) { }

  bsModalRef: BsModalRef;
  date:string;
  p : number;
  ngOnInit() {
    this.GetListSubsidiaries();

    this.fsRecuperationService.getDate().subscribe(res => {
      this.date = res as string;
      this.fsRecuperationService.DateForm.controls.dateSaisie.setValue(this.date)
      this.fsRecuperationService.getListFsRecuperationByDate(this.date).subscribe(res => {
        this.fsRecuperationService.ListFsRecuperation = res as FsRecuperation[]
      })
    })
  }


  OnDelete(ficheSuiviId){
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.fsRecuperationService.deleteFsRecuperation(ficheSuiviId).subscribe(
        res => {

          if (res as FsRecuperation) {
            this.fsRecuperationService.getListFsRecuperationByDate(this.fsRecuperationService.DateForm.controls.dateSaisie.value).subscribe(res=>{
              this.fsRecuperationService.ListFsRecuperation = res as FsRecuperation[]
              this._snackBar.open("La suppression est effectuée avec succées", "X", {
                duration: 3000,
                verticalPosition: "top",
                horizontalPosition: "right",
                panelClass: ["green-snackbar"]
              });
            })
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
      );
    }
  }

  openComponentForPost() {
    this.fsRecuperationService.initializeAddOrUpdateFsRecuperationFormForAdd();
    this.bsModalRef = this.modalService.show(FsRecuperationPostUpdateComponent,{
      class : 'modal-lg modal-dialog-centered',ignoreBackdropClick:true
    });
  }

  openComponentForUpdate(fsRecuperation : FsRecuperation) {
    this.fsRecuperationService.initializeAddOrUpdateFsRecuperationFormForUpdate(fsRecuperation);
    this.bsModalRef = this.modalService.show(FsRecuperationPostUpdateComponent,{
      class : 'modal-lg modal-dialog-centered',ignoreBackdropClick:true
    });

  }

  GetListFsRecuperationByDate() {
    this.p = 1;
    this.fsRecuperationService.getListFsRecuperationByDate(this.fsRecuperationService.DateForm.controls.dateSaisie.value).subscribe(res => {
      this.fsRecuperationService.ListFsRecuperation = res as FsRecuperation[]
    });
  }

  GetListSubsidiaries() {
    this.subsidiaryService.getListSubsidiaries().subscribe(res => {
      this.subsidiaryService.ListSubsidiaries = res as Subsidiary[]
    })
  }
}
