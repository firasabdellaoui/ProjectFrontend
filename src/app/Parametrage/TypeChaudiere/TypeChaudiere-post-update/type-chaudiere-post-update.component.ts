import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { TypeChaudiereService } from 'src/app/shared/ChaudiereMS/TypeChaudiere/type-chaudiere.service';
import { MatSnackBar } from '@angular/material';
import { TypeChaudiere } from 'src/app/shared/ChaudiereMS/TypeChaudiere/type-chaudiere.model';

@Component({
  selector: 'app-type-chaudiere-post-update',
  templateUrl: './type-chaudiere-post-update.component.html',
  styles: []
})
export class TypeChaudierePostUpdateComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private typeChaudiereService: TypeChaudiereService, private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    if (
      this.typeChaudiereService.AddOrUpdateForm.controls.typeChaudiereId.value ===
      '00000000-0000-0000-0000-000000000000'
    ) {
      this.Post();
    } else {
      this.Update();
    }
  }


  Post() {
    this.typeChaudiereService.post().subscribe(res => {
      if (res as TypeChaudiere) {
        this.bsModalRef.hide();
        this.typeChaudiereService.getList().subscribe(res => {
          this.typeChaudiereService.ListTypeChaudiere = res as TypeChaudiere[];
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
    this.typeChaudiereService.update().subscribe(res => {
      if (res as TypeChaudiere) {
        this.bsModalRef.hide();
        this.typeChaudiereService.getList().subscribe(res => {
          this.typeChaudiereService.ListTypeChaudiere = res as TypeChaudiere[];
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
