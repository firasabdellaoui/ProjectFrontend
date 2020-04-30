import { Component, OnInit } from '@angular/core';
import { UniteService } from 'src/app/shared/ChaudiereMS/Unite/unite.service';
import { MatSnackBar } from '@angular/material';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Unite } from 'src/app/shared/ChaudiereMS/Unite/unite.model';
import { UnitePostUpdateComponent } from '../Unite-post-delete/unite-post-update.component';

@Component({
  selector: 'app-unite-get-delete',
  templateUrl: './unite-get-delete.component.html',
  styles: []
})
export class UniteGetDeleteComponent implements OnInit {

  constructor(private uniteService: UniteService,
    private snackBar: MatSnackBar, private modalService: BsModalService,
  ) {
  }

  bsModalRef: BsModalRef;


  ngOnInit() {
    this.uniteService.getList().subscribe(res => {
      this.uniteService.ListUnite = res as Unite[];
    });


  }


  OnDelete(uniteId) {
    if (confirm('Vous êtes sûrs de vouloir supprimer')) {
      this.uniteService.delete(uniteId).subscribe(
        res => {

          if (res as Unite) {
            this.uniteService.getList().subscribe(res => {
              this.uniteService.ListUnite = res as Unite[];
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
    this.uniteService.initializeAddOrUpdateFormForAdd();
    this.bsModalRef = this.modalService.show(UnitePostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });

  }

  openComponentForUpdate(unite: Unite) {
    this.uniteService.initializeAddOrUpdateFormForUpdate(unite);
    this.bsModalRef = this.modalService.show(UnitePostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });
  }



}
