import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { MatSnackBar } from '@angular/material';
import { CorpsDeChauffeService } from 'src/app/shared/ChaudiereMS/Composant/CorpsDeChauffe/corps-de-chauffe.service';
import { ComposantService } from 'src/app/shared/ChaudiereMS/Composant/composant.service';
import { CorpsDeChauffe } from 'src/app/shared/ChaudiereMS/Composant/composant.model';
import { ChaudiereService } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.service';
import { Chaudiere, ChaudiereForGet } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.model';

@Component({
  selector: 'app-corps-de-chauffe-post-update',
  templateUrl: './corps-de-chauffe-post-update.component.html',
  styles: []
})
export class CorpsDeChauffePostUpdateComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private snackBar: MatSnackBar, private corpsDeChauffeService: CorpsDeChauffeService,
    private composantService: ComposantService, private chaudiereService: ChaudiereService) {
  }
  chaudiere: Chaudiere;
  ngOnInit() {
    this.getNomChaudiere();
  }

  onSubmit() {
    if (
      this.corpsDeChauffeService.AddOrUpdateForm.controls.composantId.value ===
      '00000000-0000-0000-0000-000000000000'
    ) {
      this.Post();
    }
    else {
      this.Update();
    }
  }


  Post() {
    this.corpsDeChauffeService.AddOrUpdateForm.controls.chaudiereId.setValue(this.composantService.chaudiereId);
    this.corpsDeChauffeService.post().subscribe(res => {
      if (res as CorpsDeChauffe) {
        this.bsModalRef.hide();

        this.composantService.getComposants(this.corpsDeChauffeService.AddOrUpdateForm.controls.chaudiereId.value).then();
        this.chaudiereService.getListChaudiereDto().subscribe(res => {
          this.chaudiereService.ListChaudiereForGet = res as ChaudiereForGet[];
        });
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
    this.corpsDeChauffeService.update().subscribe(res => {
      if (res as CorpsDeChauffe) {
        this.bsModalRef.hide();
        this.composantService.refreshListComposants(this.composantService.chaudiereId)
        this.chaudiereService.getListChaudiereDto().subscribe(res => {
          this.chaudiereService.ListChaudiereForGet = res as ChaudiereForGet[];
        });
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
