import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FsEauChaudeService } from '../../../shared/FicheSuivi/Fs_EauChaude/fs-eau-chaude.service';
import { MatSnackBar } from '@angular/material';
import { FsEauChaude } from '../../../shared/FicheSuivi/Fs_EauChaude/fs-eau-chaude.model';
import { FsEauChudePostUpdateComponent } from '../../../FicheSuivi/FsEauChaude/fs-eau-chude-post-update/fs-eau-chude-post-update.component';
import { ChaudiereService } from '../../../shared/ChaudiereMS/Chaudiere/chaudiere.service';
import { Chaudiere, ChaudiereForGet } from '../../../shared/ChaudiereMS/Chaudiere/chaudiere.model';
import { ComposantDto } from '../../../shared/ChaudiereMS/Composant/composant.model';
import { ComposantService } from '../../../shared/ChaudiereMS/Composant/composant.service';
import { ChaudierePostUpdateComponent } from '../chaudiere-post-update/chaudiere-post-update.component';
import { FilialeServiceService } from 'src/app/shared/FilialeMS/filiale-service.service';
import { Filiale } from 'src/app/shared/FilialeMS/filiale.model';

@Component({
  selector: 'app-chaudiere-get-delete',
  templateUrl: './chaudiere-get-delete.component.html',
  styles: []
})
export class ChaudiereGetDeleteComponent implements OnInit {

  constructor(private chaudiereService: ChaudiereService, private composantService: ComposantService,
    private snackBar: MatSnackBar, private modalService: BsModalService,
  ) {
  }

  bsModalRef: BsModalRef;


  ngOnInit() {
    this.chaudiereService.getListChaudiereDto().subscribe(res => {
      this.chaudiereService.ListChaudiereForGet = res as ChaudiereForGet[];
    });


  }


  OnDelete(chaudiereId) {
    if (confirm('Vous êtes sûrs de vouloir supprimer')) {
      this.chaudiereService.deleteChaudiere(chaudiereId).subscribe(
        res => {

          if (res as Chaudiere) {
            this.chaudiereService.getListChaudiereDto().subscribe(res => {
              this.chaudiereService.ListChaudiereForGet = res as ChaudiereForGet[];
              this.snackBar.open('La suppression est effectuée avec succées', 'X', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['green-snackbar']
              });
              this.composantService.refreshListComposants(chaudiereId);
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

  openComponentForPost() {
    this.chaudiereService.initializeAddOrUpdateFormForAdd();
    this.bsModalRef = this.modalService.show(ChaudierePostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });

  }

  openComponentForUpdate(chaudiereId: string) {
    this.chaudiereService.initializeAddOrUpdateFormForUpdate(chaudiereId);
    this.bsModalRef = this.modalService.show(ChaudierePostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });
  }

  sendEvent(event) {
    this.composantService.chaudiereId = event;
    this.composantService.refreshListComposants(this.composantService.chaudiereId);

  }
}
