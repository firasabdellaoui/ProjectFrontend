import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { UniteService } from 'src/app/shared/ChaudiereMS/Unite/unite.service';
import { MatSnackBar } from '@angular/material';
import { Unite } from 'src/app/shared/ChaudiereMS/Unite/unite.model';

@Component({
  selector: 'app-unite-post-update',
  templateUrl: './unite-post-update.component.html',
  styles: []
})
export class UnitePostUpdateComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private uniteService: UniteService, private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    if (
      this.uniteService.AddOrUpdateForm.controls.uniteId.value ===
      '00000000-0000-0000-0000-000000000000'
    ) {
      this.Post();
    } else {
      this.Update();
    }
  }


  Post() {
    this.uniteService.post().subscribe(res => {
      if (res as Unite) {
        this.bsModalRef.hide();
        this.uniteService.getList().subscribe(res => {
          this.uniteService.ListUnite = res as Unite[];
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
    this.uniteService.update().subscribe(res => {
      if (res as Unite) {
        this.bsModalRef.hide();
        this.uniteService.getList().subscribe(res => {
          this.uniteService.ListUnite = res as Unite[];
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
