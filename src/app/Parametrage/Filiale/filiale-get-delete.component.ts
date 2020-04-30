import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FilialeServiceService } from 'src/app/shared/FilialeMS/filiale-service.service';
import { MatSnackBar } from '@angular/material';
import { Filiale } from 'src/app/shared/FilialeMS/filiale.model';
import { UniteForFilialePopUpComponent } from '../Unite/Unite-For-Filiale-PopUp/unite-for-filiale-pop-up.component';
import { UniteService } from 'src/app/shared/ChaudiereMS/Unite/unite.service';
import { Unite } from 'src/app/shared/ChaudiereMS/Unite/unite.model';

@Component({
  selector: 'app-filiale-get-delete',
  templateUrl: './filiale-get-delete.component.html',
  styles: []
})
export class FilialeGetDeleteComponent implements OnInit {


  constructor(private filialeService: FilialeServiceService,
    private snackBar: MatSnackBar, private modalService: BsModalService,
    private uniteService: UniteService
  ) {
  }

  bsModalRef: BsModalRef;


  ngOnInit() {
    this.filialeService.getFilialeList().subscribe(res => {
      this.filialeService.FilialeListFromMSFiliale = res as Filiale[];
      this.filialeService.getFiliales().subscribe(res => {
        this.filialeService.FilialeList = res as Filiale[];
        this.uniteService.getList().subscribe(res => {
          this.uniteService.ListUnite = res as Unite[];
        })
      });
    });


  }


  OnDelete(filialeId) {
    if (confirm('Vous êtes sûr de vouloir supprimer')) {
      this.filialeService.delete(filialeId).subscribe(
        res => {

          if (res as Filiale) {
            this.snackBar.open('La suppression est effectuée avec succées', 'X', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['green-snackbar']
            });

          }
        },
        err => {
          console.log(err);
          this.snackBar.open('Erreur', 'X', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['red-snackbar']
          });
        }
      );
    }
  }


  CheckFiliale(filiale: Filiale) {
    const found = this.filialeService.FilialeList.some(el => el.subsidiaryId === filiale.subsidiaryId);
    if (!found) {
      this.filialeService.post(filiale).subscribe(
        res => {
          this.filialeService.getFiliales().subscribe(res => {
            this.filialeService.FilialeList = res as Filiale[];
            if (res as Filiale) {
              this.snackBar.open('L\'ajout est effectué avec succées', 'X', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['green-snackbar']
              });

            }
          });
        },
        err => {
          console.log(err);
          this.snackBar.open('Erreur', 'X', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['red-snackbar']
          });
        }
      )
    }
    else {
      this.filialeService.delete(filiale.subsidiaryId).subscribe(
        res => {
          this.filialeService.getFiliales().subscribe(res => {
            this.filialeService.FilialeList = res as Filiale[];
            if (res as Filiale) {
              this.snackBar.open('La suppression est effectué avec succées', 'X', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['green-snackbar']
              });

            }
          });
        },
        err => {
          console.log(err);
          this.snackBar.open('Erreur', 'X', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['red-snackbar']
          });
        }
      )
    }
  }

  existFiliale(filiale: Filiale) {
    return this.filialeService.FilialeList.some(el => el.subsidiaryId === filiale.subsidiaryId);
  }

  openComponentForUpdate(filiale: Filiale) {
    this.filialeService.initializeAddOrUpdateFormForUpdate(filiale);
    this.bsModalRef = this.modalService.show(UniteForFilialePopUpComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });
  }



}
