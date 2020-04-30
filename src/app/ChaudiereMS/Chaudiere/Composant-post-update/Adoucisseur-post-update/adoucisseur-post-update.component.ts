import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { MatSnackBar } from '@angular/material';
import { Chaudiere } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.model';
import { AdoucisseurService } from 'src/app/shared/ChaudiereMS/Composant/Adoucisseur/adoucisseur.service';
import { ChaudiereService } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.service';
import { ComposantService } from 'src/app/shared/ChaudiereMS/Composant/composant.service';
import { Adoucisseur } from 'src/app/shared/ChaudiereMS/Composant/composant.model';

@Component({
  selector: 'app-adoucisseur-post-update',
  templateUrl: './adoucisseur-post-update.component.html',
  styles: []
})
export class AdoucisseurPostUpdateComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private snackBar: MatSnackBar, private adoucisseurService: AdoucisseurService,
    private composantService: ComposantService, private chaudiereService: ChaudiereService) {
  }
  chaudiere: Chaudiere;
  ngOnInit() {
    this.getNomChaudiere();
  }

  onSubmit() {
    if (
      this.adoucisseurService.AddOrUpdateForm.controls.composantId.value ===
      '00000000-0000-0000-0000-000000000000'
    ) {
      this.Post();
    }
    else {
      this.Update();
    }
  }


  Post() {
    this.adoucisseurService.AddOrUpdateForm.controls.chaudiereId.setValue(this.composantService.chaudiereId);
    this.adoucisseurService.post().subscribe(res => {
      if (res as Adoucisseur) {
        this.bsModalRef.hide();

        this.composantService.getComposants(this.adoucisseurService.AddOrUpdateForm.controls.chaudiereId.value).then();
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
    this.adoucisseurService.update().subscribe(res => {
      if (res as Adoucisseur) {
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
