import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { MatSnackBar } from '@angular/material';
import { BacheAlimentaireService } from 'src/app/shared/ChaudiereMS/Composant/BacheAlimentaire/bache-alimentaire.service';
import { ComposantService } from 'src/app/shared/ChaudiereMS/Composant/composant.service';
import { ChaudiereService } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.service';
import { Chaudiere } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.model';
import { BacheAlimentaire } from 'src/app/shared/ChaudiereMS/Composant/composant.model';

@Component({
  selector: 'app-bache-alimentaire-post-update',
  templateUrl: './bache-alimentaire-post-update.component.html',
  styles: []
})
export class BacheAlimentairePostUpdateComponent implements OnInit {


  constructor(public bsModalRef: BsModalRef, private snackBar: MatSnackBar, private bacheAlimentaireService: BacheAlimentaireService,
    private composantService: ComposantService, private chaudiereService: ChaudiereService) {
  }
  chaudiere: Chaudiere;
  ngOnInit() {
    this.getNomChaudiere();
  }

  onSubmit() {
    if (
      this.bacheAlimentaireService.AddOrUpdateForm.controls.composantId.value ===
      '00000000-0000-0000-0000-000000000000'
    ) {
      this.Post();
    }
    else {
      this.Update();
    }
  }


  Post() {
    this.bacheAlimentaireService.AddOrUpdateForm.controls.chaudiereId.setValue(this.composantService.chaudiereId);
    this.bacheAlimentaireService.post().subscribe(res => {
      if (res as BacheAlimentaire) {
        this.bsModalRef.hide();

        this.composantService.getComposants(this.bacheAlimentaireService.AddOrUpdateForm.controls.chaudiereId.value).then();
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
    this.bacheAlimentaireService.update().subscribe(res => {
      if (res as BacheAlimentaire) {
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
