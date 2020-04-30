import { Component, OnInit } from '@angular/core';
import { FilialeServiceService } from 'src/app/shared/FilialeMS/filiale-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { MatSnackBar } from '@angular/material';
import { UniteService } from 'src/app/shared/ChaudiereMS/Unite/unite.service';
import { Unite } from 'src/app/shared/ChaudiereMS/Unite/unite.model';
import { Filiale } from 'src/app/shared/FilialeMS/filiale.model';

@Component({
  selector: 'app-unite-for-filiale-pop-up',
  templateUrl: './unite-for-filiale-pop-up.component.html',
  styles: []
})
export class UniteForFilialePopUpComponent implements OnInit {

  constructor(private readonly uniteService: UniteService, private readonly filialeService: FilialeServiceService,
    private snackBar: MatSnackBar, private modalService: BsModalService,
    public bsModalRef: BsModalRef) { }


  ngOnInit() {
    this.uniteService.getList().subscribe(res => {
      this.uniteService.ListUnite = res as Unite[];
    })
  }

  onSubmit() {
    this.filialeService.update().subscribe(res => {
      if (res as Filiale) {
        this.bsModalRef.hide();
        this.filialeService.getFiliales().subscribe(res => {
          this.filialeService.FilialeList = res as Filiale[];
        });
        this.snackBar.open('L\'ajout est effectuée avec succées', 'X', {
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
