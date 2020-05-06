import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FsEauChaudeService } from '../../../shared/FicheSuivi/Fs_EauChaude/fs-eau-chaude.service';
import { MatSnackBar } from '@angular/material';
import { FsEauChaude } from '../../../shared/FicheSuivi/Fs_EauChaude/fs-eau-chaude.model';
import { ChaudiereService } from '../../../shared/ChaudiereMS/Chaudiere/chaudiere.service';
import { Chaudiere, ChaudiereForGet } from '../../../shared/ChaudiereMS/Chaudiere/chaudiere.model';
import { TypeChaudiereService } from '../../../shared/ChaudiereMS/TypeChaudiere/type-chaudiere.service';
import { TypeChaudiere } from '../../../shared/ChaudiereMS/TypeChaudiere/type-chaudiere.model';
import { FilialeServiceService } from 'src/app/shared/FilialeMS/filiale-service.service';
import { Filiale } from 'src/app/shared/FilialeMS/filiale.model';

@Component({
  selector: 'app-chaudiere-post-update',
  templateUrl: './chaudiere-post-update.component.html',
  styles: []
})
export class ChaudierePostUpdateComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private chaudiereService: ChaudiereService, private snackBar: MatSnackBar,
    private typeChaudiereService: TypeChaudiereService, private filialeServiceService: FilialeServiceService) { }

  ngOnInit() {
    this.typeChaudiereService.getList().subscribe(res => {
      this.typeChaudiereService.ListTypeChaudiere = res as TypeChaudiere[];
    });
    this.chaudiereService.getFilialeLisParam().subscribe(res => {
      this.chaudiereService.FilialeListParam = (res as Filiale[]).filter(x => x.uniteId);
    });
  }

  onSubmit() {
    if (
      this.chaudiereService.AddOrUpdateForm.controls.chaudiereId.value ===
      '00000000-0000-0000-0000-000000000000'
    ) {
      this.Post();
    } else {
      this.Update();
    }
  }


  Post() {
    this.chaudiereService.postChaudiere().subscribe(res => {
      if (res as Chaudiere) {
        this.bsModalRef.hide();
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
    this.chaudiereService.updateChaudiere().subscribe(res => {
      if (res as Chaudiere) {
        this.bsModalRef.hide();
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

}
