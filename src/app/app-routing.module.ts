import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FsEauChaudeGetDeleteComponent } from './FicheSuivi/FsEauChaude/fs-eau-chaude-get-delete/fs-eau-chaude-get-delete.component';
import { ChaudiereGetDeleteComponent } from './ChaudiereMS/Chaudiere/chaudiere-get-delete/chaudiere-get-delete.component';
import { ChaudiereComponent } from './ChaudiereMS/Chaudiere/chaudiere.component';
import { FilialeGetDeleteComponent } from './Parametrage/Filiale/filiale-get-delete.component';
import { TypeChaudiereGetDeleteComponent } from './Parametrage/TypeChaudiere/TypeChaudiere-get-delete/type-chaudiere-get-delete.component';
import { ParametrageComponent } from './Parametrage/parametrage.component';
import { FsHuileThermiqueGetDeleteComponent } from './FicheSuivi/FsHuileThermique/fs-huile-thermique-get-delete/fs-huile-thermique-get-delete.component';
import { FsRecuperationGetDeleteComponent } from './FicheSuivi/FsRecuperation/fs-recuperation-get-delete/fs-recuperation-get-delete.component';
import { FsVapeurGetDeleteComponent } from './FicheSuivi/FsVapeur/fs-vapeur-get-delete/fs-vapeur-get-delete.component';

const routes: Routes = [
  {
    path: "FsEauChaude",
    component: FsEauChaudeGetDeleteComponent,
  },
  {
    path: "FsHuileThermique",
    component: FsHuileThermiqueGetDeleteComponent,
  },
  {
    path: "FsRecuperation",
    component: FsRecuperationGetDeleteComponent,
  },
  {
    path: "FsVapeur",
    component: FsVapeurGetDeleteComponent,
  },
  {
    path: 'Chaudière',
    component: ChaudiereComponent
  },
  {
    path: 'Parametrage',
    component: ParametrageComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
