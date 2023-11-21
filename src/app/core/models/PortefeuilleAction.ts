import { Portefeuille } from "./Portefeuille";
import { Action } from "./Action";
export class PortefeuilleAction{
    idPortefeuilleAction:number;
    quantite:number;
    prix_total:number;
    dateAjout:Date;
    portefeuille : Portefeuille;
    action: Action;
}