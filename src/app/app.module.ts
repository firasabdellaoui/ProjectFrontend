import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavbarComponent } from './navbar/header-navbar/header-navbar.component';
import { SidebarLeftComponent } from './navbar/sidebar-left/sidebar-left.component';
import { GeneralLayoutComponent } from './general-layout/general-layout.component';
import { FooterLeftComponent } from './navbar/footer-left/footer-left.component';
import { FooterRightComponent } from './navbar/footer-right/footer-right.component';
import { FsEauChaudeGetDeleteComponent } from './FicheSuivi/FsEauChaude/fs-eau-chaude-get-delete/fs-eau-chaude-get-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FsEauChudePostUpdateComponent } from './FicheSuivi/FsEauChaude/fs-eau-chude-post-update/fs-eau-chude-post-update.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChaudiereGetDeleteComponent } from './ChaudiereMS/Chaudiere/chaudiere-get-delete/chaudiere-get-delete.component';
import { ChaudiereComponent } from './ChaudiereMS/Chaudiere/chaudiere.component';
import { ComposantGetDeleteComponent } from './ChaudiereMS/Chaudiere/Composant-get-delete/composant-get-delete.component';
import { ChaudierePostUpdateComponent } from './ChaudiereMS/Chaudiere/chaudiere-post-update/chaudiere-post-update.component';
import { PompeAlimentaireGetDeleteComponent } from './ChaudiereMS/Chaudiere/Composant-Details/PompeAlimentaire-get-delete/pompe-alimentaire-get-delete.component';
import { CorpsDeChauffePostUpdateComponent } from './ChaudiereMS/Chaudiere/Composant-post-update/CorpsDeChauffe-post-update/corps-de-chauffe-post-update.component';
import { AdoucisseurPostUpdateComponent } from './ChaudiereMS/Chaudiere/Composant-post-update/Adoucisseur-post-update/adoucisseur-post-update.component';
import { PompeAlimentairePostUpdateComponent } from './ChaudiereMS/Chaudiere/Composant-post-update/PompeAlimentaire-post-update/pompe-alimentaire-post-update.component';
import { BacheAlimentairePostUpdateComponent } from './ChaudiereMS/Chaudiere/Composant-post-update/BacheAlimentaire-post-update/bache-alimentaire-post-update.component';
import { BruleurPostUpdateComponent } from './ChaudiereMS/Chaudiere/Composant-post-update/Bruleur-post-update/bruleur-post-update.component';
import { FilialeGetDeleteComponent } from './Parametrage/Filiale/filiale-get-delete.component';
import { TypeChaudiereGetDeleteComponent } from './Parametrage/TypeChaudiere/TypeChaudiere-get-delete/type-chaudiere-get-delete.component';
import { TypeChaudierePostUpdateComponent } from './Parametrage/TypeChaudiere/TypeChaudiere-post-update/type-chaudiere-post-update.component';
import { ParametrageComponent } from './Parametrage/parametrage.component';
import { UniteGetDeleteComponent } from './Parametrage/Unite/Unite-get-delete/unite-get-delete.component';
import { UnitePostUpdateComponent } from './Parametrage/Unite/Unite-post-delete/unite-post-update.component';
import { UniteForFilialePopUpComponent } from './Parametrage/Unite/Unite-For-Filiale-PopUp/unite-for-filiale-pop-up.component';



import { FsHuileThermiqueGetDeleteComponent } from './FicheSuivi/FsHuileThermique/fs-huile-thermique-get-delete/fs-huile-thermique-get-delete.component';
import { FsHuileThermiquePostUpdateComponent } from './FicheSuivi/FsHuileThermique/fs-huile-thermique-post-update/fs-huile-thermique-post-update.component';
import { FsRecuperationGetDeleteComponent } from './FicheSuivi/FsRecuperation/fs-recuperation-get-delete/fs-recuperation-get-delete.component';
import { FsRecuperationPostUpdateComponent } from './FicheSuivi/FsRecuperation/fs-recuperation-post-update/fs-recuperation-post-update.component';
import { FsVapeurGetDeleteComponent } from './FicheSuivi/FsVapeur/fs-vapeur-get-delete/fs-vapeur-get-delete.component';
import { FsVapeurPostUpdateComponent } from './FicheSuivi/FsVapeur/fs-vapeur-post-update/fs-vapeur-post-update.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule, MatAutocompleteModule, MatCheckboxModule, } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { filterPipeFS } from './shared/filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderNavbarComponent,
    SidebarLeftComponent,
    GeneralLayoutComponent,
    FooterLeftComponent,
    FooterRightComponent,
    FsEauChaudeGetDeleteComponent,
    FsEauChudePostUpdateComponent,

    ChaudiereGetDeleteComponent,
    ChaudiereComponent,
    ComposantGetDeleteComponent,
    ChaudierePostUpdateComponent,
    PompeAlimentaireGetDeleteComponent,
    CorpsDeChauffePostUpdateComponent,
    AdoucisseurPostUpdateComponent,
    PompeAlimentairePostUpdateComponent,
    BacheAlimentairePostUpdateComponent,
    BruleurPostUpdateComponent,
    FilialeGetDeleteComponent,
    ParametrageComponent,
    TypeChaudiereGetDeleteComponent,
    TypeChaudierePostUpdateComponent,
    UniteGetDeleteComponent,
    UnitePostUpdateComponent,
    UniteForFilialePopUpComponent,


    FsHuileThermiqueGetDeleteComponent,
    FsHuileThermiquePostUpdateComponent,
    FsRecuperationGetDeleteComponent,
    FsRecuperationPostUpdateComponent,
    FsVapeurGetDeleteComponent,
    FsVapeurPostUpdateComponent,
    filterPipeFS,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    Ng2SearchPipeModule,
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FsEauChudePostUpdateComponent,

    ChaudierePostUpdateComponent,
    CorpsDeChauffePostUpdateComponent,
    AdoucisseurPostUpdateComponent,
    PompeAlimentairePostUpdateComponent,
    BacheAlimentairePostUpdateComponent,
    BruleurPostUpdateComponent,
    TypeChaudierePostUpdateComponent,
    UnitePostUpdateComponent,
    UniteForFilialePopUpComponent,

    FsHuileThermiquePostUpdateComponent,
    FsRecuperationPostUpdateComponent,
    FsVapeurPostUpdateComponent]


})
export class AppModule { }
