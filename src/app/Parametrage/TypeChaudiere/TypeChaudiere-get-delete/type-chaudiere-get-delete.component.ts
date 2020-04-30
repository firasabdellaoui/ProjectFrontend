import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TypeChaudiereService } from 'src/app/shared/ChaudiereMS/TypeChaudiere/type-chaudiere.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TypeChaudiere } from 'src/app/shared/ChaudiereMS/TypeChaudiere/type-chaudiere.model';
import { TypeChaudierePostUpdateComponent } from '../TypeChaudiere-post-update/type-chaudiere-post-update.component';

@Component({
  selector: 'app-type-chaudiere-get-delete',
  templateUrl: './type-chaudiere-get-delete.component.html',
  styles: []
})
export class TypeChaudiereGetDeleteComponent implements OnInit {

  constructor(private typeChaudiereService: TypeChaudiereService,
    private snackBar: MatSnackBar, private modalService: BsModalService,
  ) {
  }

  bsModalRef: BsModalRef;


  ngOnInit() {
    this.typeChaudiereService.getList().subscribe(res => {
      this.typeChaudiereService.ListTypeChaudiere = res as TypeChaudiere[];
    });


  }


  OnDelete(typeChaudiereId) {
    if (confirm('Vous êtes sûrs de vouloir supprimer')) {
      this.typeChaudiereService.delete(typeChaudiereId).subscribe(
        res => {

          if (res as TypeChaudiere) {
            this.typeChaudiereService.getList().subscribe(res => {
              this.typeChaudiereService.ListTypeChaudiere = res as TypeChaudiere[];
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
    this.typeChaudiereService.initializeAddOrUpdateFormForAdd();
    this.bsModalRef = this.modalService.show(TypeChaudierePostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });

  }

  openComponentForUpdate(typeChaudiere: TypeChaudiere) {
    this.typeChaudiereService.initializeAddOrUpdateFormForUpdate(typeChaudiere);
    this.bsModalRef = this.modalService.show(TypeChaudierePostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });
  }



}
