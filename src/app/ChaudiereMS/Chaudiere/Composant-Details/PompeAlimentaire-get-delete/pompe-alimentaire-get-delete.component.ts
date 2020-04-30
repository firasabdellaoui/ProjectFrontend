import { Component, OnInit } from '@angular/core';
import {ChaudiereService} from '../../../../shared/ChaudiereMS/Chaudiere/chaudiere.service';
import {ComposantService} from '../../../../shared/ChaudiereMS/Composant/composant.service';
import {MatSnackBar} from '@angular/material';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Chaudiere, ChaudiereForGet} from '../../../../shared/ChaudiereMS/Chaudiere/chaudiere.model';
import {ChaudierePostUpdateComponent} from '../../chaudiere-post-update/chaudiere-post-update.component';
import {PompeAlimentaireService} from '../../../../shared/ChaudiereMS/Composant/PompeAlimentaire/pompe-alimentaire.service';
import {PompeAlimentaire} from '../../../../shared/ChaudiereMS/Composant/composant.model';

@Component({
  selector: 'app-pompe-alimentaire-get-delete',
  templateUrl: './pompe-alimentaire-get-delete.component.html',
  styles: []
})
export class PompeAlimentaireGetDeleteComponent implements OnInit {

  constructor(private pompeAlimentaireService: PompeAlimentaireService, private composantService: ComposantService,
              private snackBar: MatSnackBar, private modalService: BsModalService) {
  }

  bsModalRef: BsModalRef;


  ngOnInit() {
    this.pompeAlimentaireService.getListPompeAlimentaire().subscribe(res => {
      this.pompeAlimentaireService.PompeAlimentaireList = res as PompeAlimentaire[];
    });
  }


  OnDelete(composantId) {
    if (confirm('Vous êtes sûr de vouloir supprimer')) {
      this.pompeAlimentaireService.deletePompeAlimentaire(composantId).subscribe(
        res => {

          if (res as Chaudiere) {
            this.pompeAlimentaireService.getListPompeAlimentaire().subscribe(res => {
              this.pompeAlimentaireService.PompeAlimentaireList = res as PompeAlimentaire[];
              this.snackBar.open('La suppression est effectuée avec succées', 'X', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['green-snackbar']
              });
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
    this.pompeAlimentaireService.initializeAddOrUpdateFormForAdd();
    this.bsModalRef = this.modalService.show(ChaudierePostUpdateComponent, {
      class: 'modal-lg'
    });

  }

  openComponentForUpdate(pompeAlimentaire: PompeAlimentaire) {
    this.pompeAlimentaireService.initializeAddOrUpdateFormForUpdate(pompeAlimentaire);
    this.bsModalRef = this.modalService.show(ChaudierePostUpdateComponent, {
      class: 'modal-lg'
    });
  }

}
