import { Component, OnInit } from '@angular/core';
import { FsHuileThermiqueService } from 'src/app/shared/FicheSuivi/Fs_HuileThermique/fs-huile-thermique.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatSnackBar } from '@angular/material';
import { FsHuileThermique } from 'src/app/shared/FicheSuivi/Fs_HuileThermique/fs-huile-thermique.model';
import { FsHuileThermiquePostUpdateComponent } from '../fs-huile-thermique-post-update/fs-huile-thermique-post-update.component';
import { SubsidiaryService } from 'src/app/shared/Subsidiary/subsidiary.service';
import { Subsidiary } from 'src/app/shared/Subsidiary/subsidiary.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fs-huile-thermique-get-delete',
  templateUrl: './fs-huile-thermique-get-delete.component.html',
  styles: []
})
export class FsHuileThermiqueGetDeleteComponent implements OnInit {
  SearchByFilialeForm = this.fb.group({
    filiale:["",],
  });
  constructor(private fsHuileThermiqueService : FsHuileThermiqueService,
     private _snackBar: MatSnackBar,
      private modalService: BsModalService,
      private subsidiaryService: SubsidiaryService,
      private fb : FormBuilder) { }

  bsModalRef: BsModalRef;
  date: string;
  p : number;
  ngOnInit() {

    this.GetListSubsidiaries();

    this.fsHuileThermiqueService.getDate().subscribe(res => {
      this.date = res as string;
      this.fsHuileThermiqueService.DateForm.controls.dateSaisie.setValue(this.date)
      this.fsHuileThermiqueService.getListFsHuileThermiqueByDate(this.date).subscribe(res => {
        this.fsHuileThermiqueService.ListFsHuileThermique = res as FsHuileThermique[]
      })
    })
  }

  OnDelete(ficheSuiviId){
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.fsHuileThermiqueService.deleteFsHuileThermique(ficheSuiviId).subscribe(
        res => {

          if (res as FsHuileThermique) {
            this.fsHuileThermiqueService.getListFsHuileThermiqueByDate(this.fsHuileThermiqueService.DateForm.controls.dateSaisie.value).subscribe(res=>{
              this.fsHuileThermiqueService.ListFsHuileThermique = res as FsHuileThermique[]
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
    this.fsHuileThermiqueService.initializeAddOrUpdateFsHuileThermiqueFormFormForAdd();
    this.bsModalRef = this.modalService.show(FsHuileThermiquePostUpdateComponent,{
      class : 'modal-lg modal-dialog-centered',ignoreBackdropClick:true
    });
  }

  openComponentForUpdate(fsHuileThermique : FsHuileThermique) {
    this.fsHuileThermiqueService.initializeAddOrUpdateFsHuileThermiqueFormFormForUpdate(fsHuileThermique);
    this.bsModalRef = this.modalService.show(FsHuileThermiquePostUpdateComponent,{
      class : 'modal-lg modal-dialog-centered',ignoreBackdropClick:true
    });

  }

  GetListHuileThermiqueByDate() {
    this.p=1;
    this.fsHuileThermiqueService.getListFsHuileThermiqueByDate(this.fsHuileThermiqueService.DateForm.controls.dateSaisie.value).subscribe(res => {
      this.fsHuileThermiqueService.ListFsHuileThermique = res as FsHuileThermique[]
    });
  }

  GetListSubsidiaries() {
    this.subsidiaryService.getListSubsidiaries().subscribe(res => {
      this.subsidiaryService.ListSubsidiaries = res as Subsidiary[]
    })
  }
}
