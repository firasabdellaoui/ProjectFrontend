import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { MatSnackBar } from '@angular/material';
import { BruleurService } from 'src/app/shared/ChaudiereMS/Composant/Bruleur/bruleur.service';
import { ComposantService } from 'src/app/shared/ChaudiereMS/Composant/composant.service';
import { ChaudiereService } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.service';
import { Chaudiere } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.model';
import { Bruleur } from 'src/app/shared/ChaudiereMS/Composant/composant.model';

@Component({
  selector: 'app-bruleur-post-update',
  templateUrl: './bruleur-post-update.component.html',
  styles: []
})
export class BruleurPostUpdateComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private snackBar: MatSnackBar, private bruleurService: BruleurService,
    private composantService: ComposantService, private chaudiereService: ChaudiereService) {
  }
  chaudiere: Chaudiere;
  ngOnInit() {
    this.getNomChaudiere();
  }

  onSubmit() {
    if (
      this.bruleurService.AddOrUpdateForm.controls.composantId.value ===
      '00000000-0000-0000-0000-000000000000'
    ) {
      this.Post();
    }
    else {
      this.Update();
    }
  }


  Post() {
    this.bruleurService.AddOrUpdateForm.controls.chaudiereId.setValue(this.composantService.chaudiereId);
    this.bruleurService.post().subscribe(res => {
      if (res as Bruleur) {
        this.bsModalRef.hide();

        this.composantService.getComposants(this.bruleurService.AddOrUpdateForm.controls.chaudiereId.value).then();
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
    this.bruleurService.update().subscribe(res => {
      if (res as Bruleur) {
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
