import { Component, OnInit } from '@angular/core';
import { FsEauChaudeService } from 'src/app/shared/FicheSuivi/Fs_EauChaude/fs-eau-chaude.service';
import { FsEauChaude } from 'src/app/shared/FicheSuivi/Fs_EauChaude/fs-eau-chaude.model';
import { MatSnackBar } from '@angular/material';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FsEauChudePostUpdateComponent } from '../fs-eau-chude-post-update/fs-eau-chude-post-update.component';
import { FormBuilder } from '@angular/forms';
import { SubsidiaryService } from 'src/app/shared/Subsidiary/subsidiary.service';
import { Subsidiary } from 'src/app/shared/Subsidiary/subsidiary.model';


@Component({
  selector: 'app-fs-eau-chaude-get-delete',
  templateUrl: './fs-eau-chaude-get-delete.component.html',
  styles: []
})
export class FsEauChaudeGetDeleteComponent implements OnInit {
 
  constructor(private fsEauChaudeService: FsEauChaudeService,
    private _snackBar: MatSnackBar,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private subsidiaryService: SubsidiaryService) { }

  SearchByFilialeForm = this.fb.group({
    filiale:["",],
  });


  bsModalRef: BsModalRef;
  date: string;
  p :number;
  ngOnInit() {
   
    this.GetListSubsidiaries();

    this.fsEauChaudeService.getDate().subscribe(res => {
      this.date = res as string;
      this.fsEauChaudeService.DateForm.controls.dateSaisie.setValue(this.date)
      this.fsEauChaudeService.getListFsEauChaudeByDate(this.date).subscribe(res => {
        this.fsEauChaudeService.ListFsEauChaude = res as FsEauChaude[]
      })
    })
  }

  OnDelete(ficheSuiviId) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.fsEauChaudeService.deleteFsEauChaude(ficheSuiviId).subscribe(
        res => {

          if (res as FsEauChaude) {
            this.fsEauChaudeService.getListFsEauChaudeByDate(this.fsEauChaudeService.DateForm.controls.dateSaisie.value).subscribe(res => {
              this.fsEauChaudeService.ListFsEauChaude = res as FsEauChaude[]
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
    this.fsEauChaudeService.initializeAddOrUpdateFsEauChaudeFormFormForAdd();
    this.bsModalRef = this.modalService.show(FsEauChudePostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });

  }

  openComponentForUpdate(fsEauChaude: FsEauChaude) {
    this.fsEauChaudeService.initializeAddOrUpdateFsEauChaudeFormFormForUpdate(fsEauChaude);
    this.bsModalRef = this.modalService.show(FsEauChudePostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });

  }

  GetListFsEauChaudeByDate() {
    this.p=1;
    this.fsEauChaudeService.getListFsEauChaudeByDate(this.fsEauChaudeService.DateForm.controls.dateSaisie.value).subscribe(res => {
      this.fsEauChaudeService.ListFsEauChaude = res as FsEauChaude[]
    });
  }

  GetListSubsidiaries() {
    this.subsidiaryService.getListSubsidiaries().subscribe(res => {
      this.subsidiaryService.ListSubsidiaries = res as Subsidiary[]
    })
  }

}
