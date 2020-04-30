export class ComposantDto {
  composantId: string;
  composant: string;
  etat: string;
}


export class PompeAlimentaire {
  puissanceElectrique: number;
  composantId: string;
  dateAcquisition: Date;
  prixAcquisition: number;
  etat: number;
  chaudiereId: string;
}

export class BacheAlimentaire {
  type: number;
  volume: number;
  composantId: string;
  dateAcquisition: Date;
  prixAcquisition: number;
  etat: number;
  chaudiereId: string;
}

export class Adoucisseur {
  volumeResine: number;
  debitUtilisation: number;
  type: string;
  composantId: string;
  dateAcquisition: Date;
  prixAcquisition: number;
  etat: number;
  chaudiereId: string;
}

export class Bruleur {
  marque: string;
  modele: string;
  type: number;
  anneeFabrication: number;
  puissanceElectrique: number;
  typeCombustible: string;
  composantId: string;
  dateAcquisition: Date;
  prixAcquisition: number;
  etat: number;
  chaudiereId: string;
}

export class CorpsDeChauffe {
  marque: string;
  modele: string;
  dateFabrication: number;
  puissanceThermique: number;
  pressionService: number;
  pressionTimbre: number;
  temperatureTravail: number;
  debitVapeur: number;
  economiseur: boolean;
  composantId: string;
  dateAcquisition: Date;
  prixAcquisition: number;
  etat: number;
  chaudiereId: string;
}
