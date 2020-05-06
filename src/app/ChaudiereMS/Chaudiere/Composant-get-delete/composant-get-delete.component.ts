import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ComposantService } from '../../../shared/ChaudiereMS/Composant/composant.service';
import { PompeAlimentaireService } from '../../../shared/ChaudiereMS/Composant/PompeAlimentaire/pompe-alimentaire.service';
import { CorpsDeChauffeService } from 'src/app/shared/ChaudiereMS/Composant/CorpsDeChauffe/corps-de-chauffe.service';
import { CorpsDeChauffePostUpdateComponent } from '../Composant-post-update/CorpsDeChauffe-post-update/corps-de-chauffe-post-update.component';
import { AdoucisseurPostUpdateComponent } from '../Composant-post-update/Adoucisseur-post-update/adoucisseur-post-update.component';
import { AdoucisseurService } from 'src/app/shared/ChaudiereMS/Composant/Adoucisseur/adoucisseur.service';
import { PompeAlimentairePostUpdateComponent } from '../Composant-post-update/PompeAlimentaire-post-update/pompe-alimentaire-post-update.component';
import { BacheAlimentaireService } from 'src/app/shared/ChaudiereMS/Composant/BacheAlimentaire/bache-alimentaire.service';
import { BacheAlimentairePostUpdateComponent } from '../Composant-post-update/BacheAlimentaire-post-update/bache-alimentaire-post-update.component';
import { BruleurPostUpdateComponent } from '../Composant-post-update/Bruleur-post-update/bruleur-post-update.component';
import { BruleurService } from 'src/app/shared/ChaudiereMS/Composant/Bruleur/bruleur.service';
import { ComposantDto, Adoucisseur, PompeAlimentaire, BacheAlimentaire, Bruleur, CorpsDeChauffe } from 'src/app/shared/ChaudiereMS/Composant/composant.model';
import { ChaudiereService } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.service';
import { ChaudiereForGet } from 'src/app/shared/ChaudiereMS/Chaudiere/chaudiere.model';

@Component({
  selector: 'app-composant-get-delete',
  templateUrl: './composant-get-delete.component.html',
  styles: []
})
export class ComposantGetDeleteComponent implements OnInit {

  constructor(private pompeAlimentaireService: PompeAlimentaireService, private snackBar: MatSnackBar, private modalService: BsModalService,
    private composantService: ComposantService, private corpsDeChauffeService: CorpsDeChauffeService, private adoucisseurService: AdoucisseurService,
    private bacheAlimentaireService: BacheAlimentaireService, private bruleurService: BruleurService, private chaudiereService: ChaudiereService) { }


  bsModalRef: BsModalRef;
  adoucisseur: Adoucisseur;
  pompeAlimentaire: PompeAlimentaire;
  bacheAlimentaire: BacheAlimentaire;
  bruleur: Bruleur;
  corpsDeChauffe: CorpsDeChauffe;

  ngOnInit(): void {
    if (this.composantService.chaudiereId) {
      this.composantService.refreshListComposants(event);
    }

  }


  OnDelete(composantId) {
    if (confirm('Vous êtes sûrs de vouloir supprimer')) {
      this.composantService.deleteComposant(composantId).subscribe(
        res => {

          if (res as ComposantDto) {

            this.snackBar.open('La suppression est effectuée avec succées', 'X', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['green-snackbar']
            });
            this.composantService.refreshListComposants(this.composantService.chaudiereId);
            this.chaudiereService.getListChaudiereDto().subscribe(res => {
              this.chaudiereService.ListChaudiereForGet = res as ChaudiereForGet[];
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


  openPompeAlimentaireForPost() {
    this.pompeAlimentaireService.initializeAddOrUpdateFormForAdd();
    this.bsModalRef = this.modalService.show(PompeAlimentairePostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });
  }

  openCorpsDeChauffeComponentForPost() {
    this.corpsDeChauffeService.initializeAddOrUpdateFormForAdd();
    this.bsModalRef = this.modalService.show(CorpsDeChauffePostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });
  }
  openAdoucisseurComponentForPost() {
    this.adoucisseurService.initializeAddOrUpdateFormForAdd();
    this.bsModalRef = this.modalService.show(AdoucisseurPostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });
  }

  openBacheAlimentaireComponentForPost() {
    this.bacheAlimentaireService.initializeAddOrUpdateFormForAdd();
    this.bsModalRef = this.modalService.show(BacheAlimentairePostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });
  }

  openBruleurComponentForPost() {
    this.bruleurService.initializeAddOrUpdateFormForAdd();
    this.bsModalRef = this.modalService.show(BruleurPostUpdateComponent, {
      class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
    });
  }

  openDetails(composant: ComposantDto) {
    if (composant.composant == 'Adoucisseur') {
      this.adoucisseurService.getById(composant.composantId).subscribe(res => {
        this.adoucisseur = res as Adoucisseur;
        this.adoucisseurService.initializeAddOrUpdateFormForUpdate(this.adoucisseur);
        this.bsModalRef = this.modalService.show(AdoucisseurPostUpdateComponent, {
          class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
        });
      });
    }
    else if (composant.composant == 'PompeAlimentaire') {
      this.pompeAlimentaireService.getPompeAlimentaireById(composant.composantId).subscribe(res => {
        this.pompeAlimentaire = res as PompeAlimentaire;
        this.pompeAlimentaireService.initializeAddOrUpdateFormForUpdate(this.pompeAlimentaire);
        this.bsModalRef = this.modalService.show(PompeAlimentairePostUpdateComponent, {
          class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
        });
      });
    }
    else if (composant.composant == 'BacheAlimentaire') {
      this.bacheAlimentaireService.getById(composant.composantId).subscribe(res => {
        this.bacheAlimentaire = res as BacheAlimentaire;
        this.bacheAlimentaireService.initializeAddOrUpdateFormForUpdate(this.bacheAlimentaire);
        this.bsModalRef = this.modalService.show(BacheAlimentairePostUpdateComponent, {
          class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
        });
      });
    }
    else if (composant.composant == 'Bruleur') {
      this.bruleurService.getById(composant.composantId).subscribe(res => {
        this.bruleur = res as Bruleur;
        this.bruleurService.initializeAddOrUpdateFormForUpdate(this.bruleur);
        this.bsModalRef = this.modalService.show(BruleurPostUpdateComponent, {
          class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
        });
      });
    }
    else if (composant.composant == 'CorpsDeChauffe') {
      this.corpsDeChauffeService.getById(composant.composantId).subscribe(res => {
        this.corpsDeChauffe = res as CorpsDeChauffe;
        this.corpsDeChauffeService.initializeAddOrUpdateFormForUpdate(this.corpsDeChauffe);
        this.bsModalRef = this.modalService.show(CorpsDeChauffePostUpdateComponent, {
          class: 'modal-lg modal-dialog-centered', ignoreBackdropClick: true
        });
      });
    }
  }



}
