import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { MatSnackBar } from '@angular/material';
import { PompeAlimentaireService } from 'src/app/shared/ChaudiereMS/Composant/PompeAlimentaire/pompe-alimentaire.service';
import { ComposantService } from 'src/app/shared/ChaudiereMS/Composant/composant.service';
import { PompeAlimentaire } from 'src/app/shared/ChaudiereMS/Composant/composant.model';
import { ChaudiereService } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.service';
import { Chaudiere } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.model';

@Component({
  selector: 'app-pompe-alimentaire-post-update',
  templateUrl: './pompe-alimentaire-post-update.component.html',
  styles: []
})
export class PompeAlimentairePostUpdateComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private snackBar: MatSnackBar, private pompeAlimentaireService: PompeAlimentaireService,
    private composantService: ComposantService, private chaudiereService: ChaudiereService) {
  }

  chaudiere: Chaudiere;
  ngOnInit() {
    this.getNomChaudiere();
  }

  onSubmit() {
    if (
      this.pompeAlimentaireService.AddOrUpdateForm.controls.composantId.value ===
      '00000000-0000-0000-0000-000000000000'
    ) {
      this.Post();
    }
    else {
      this.Update()
    }
  }


  Post() {
    this.pompeAlimentaireService.AddOrUpdateForm.controls.chaudiereId.setValue(this.composantService.chaudiereId);
    this.pompeAlimentaireService.postPompeAlimentaire().subscribe(res => {
      if (res as PompeAlimentaire) {
        this.bsModalRef.hide();

        this.composantService.getComposants(this.pompeAlimentaireService.AddOrUpdateForm.controls.chaudiereId.value).then();
        this.snackBar.open('L\'ajout est effectué avec succées', 'X', {
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

  Update() {
    this.pompeAlimentaireService.updatePompeAlimentaire().subscribe(res => {
      if (res as PompeAlimentaire) {
        this.bsModalRef.hide();
        this.composantService.refreshListComposants(this.composantService.chaudiereId)
        this.snackBar.open('La modification est effectuée avec succées', 'X', {
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

  getNomChaudiere() {
    return this.chaudiereService.getChaudiereById(this.composantService.chaudiereId).subscribe(
      res => {
        this.chaudiere = res as Chaudiere;
      }
    )
  }

}
