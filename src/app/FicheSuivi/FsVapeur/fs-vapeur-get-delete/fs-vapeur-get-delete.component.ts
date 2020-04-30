import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FsVapeurService } from 'src/app/shared/FicheSuivi/Fs_Vapeur/fs-vapeur.service';
import { FsVapeur } from 'src/app/shared/FicheSuivi/Fs_Vapeur/fs-vapeur.model';
import { FsVapeurPostUpdateComponent } from '../fs-vapeur-post-update/fs-vapeur-post-update.component';
import { SubsidiaryService } from 'src/app/shared/Subsidiary/subsidiary.service';
import { FormBuilder } from '@angular/forms';
import { Subsidiary } from 'src/app/shared/Subsidiary/subsidiary.model';

@Component({
  selector: 'app-fs-vapeur-get-delete',
  templateUrl: './fs-vapeur-get-delete.component.html',
  styles: []
})
export class FsVapeurGetDeleteComponent implements OnInit {
  SearchByFilialeForm = this.fb.group({
    filiale:["",],
  });

  constructor(private fsVapeurService : FsVapeurService,
     private _snackBar: MatSnackBar,
      private modalService: BsModalService,
      private subsidiaryService: SubsidiaryService,
      private fb : FormBuilder) { }
  
  bsModalRef: BsModalRef;
  date:string;
  p : number;
  ngOnInit() {
    
    this.GetListSubsidiaries()

    this.fsVapeurService.getDate().subscribe(res => {
      this.date = res as string;
      this.fsVapeurService.DateForm.controls.dateSaisie.setValue(this.date)
      this.fsVapeurService.getListFsVapeurByDate(this.date).subscribe(res => {
      this.fsVapeurService.ListFsVapeur = res as FsVapeur[]
      })
    })
  
  }
  scroll(){
    debugger
    window.scrollTo(500,0)
  }

  OnDelete(ficheSuiviId){
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.fsVapeurService.deleteFsVapeur(ficheSuiviId).subscribe(
        res => {

          if (res as FsVapeur) {
            this.fsVapeurService.getListFsVapeurByDate(this.fsVapeurService.DateForm.controls.dateSaisie.value).subscribe(res=>{
              this.fsVapeurService.ListFsVapeur = res as FsVapeur[]
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
    this.fsVapeurService.initializeAddOrUpdateFsVapeurFormForAdd();
    this.bsModalRef = this.modalService.show(FsVapeurPostUpdateComponent,{
      class : 'modal-lg modal-dialog-centered',ignoreBackdropClick:true
    });
  }

  openComponentForUpdate(fsVapeur : FsVapeur) {
    this.fsVapeurService.initializeAddOrUpdateFsVapeurFormForUpdate(fsVapeur);
    this.bsModalRef = this.modalService.show(FsVapeurPostUpdateComponent,{
      class : 'modal-lg modal-dialog-centered',ignoreBackdropClick:true
    });

  }

  GetListFsVapeurByDate() {
    this.p = 1;
    this.fsVapeurService.getListFsVapeurByDate(this.fsVapeurService.DateForm.controls.dateSaisie.value).subscribe(res => {
      this.fsVapeurService.ListFsVapeur = res as FsVapeur[]
    });
  }

  GetListSubsidiaries() {
    this.subsidiaryService.getListSubsidiaries().subscribe(res => {
      this.subsidiaryService.ListSubsidiaries = res as Subsidiary[]
    })
  }
}
