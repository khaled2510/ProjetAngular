import { Presentation } from "./Presentation";
import { Participation } from "./Participation";
import { Commentaire } from "./Commentaire";

export class Evenement {
    id: number;
    nom: string;
    description: string;
    rue: string;
    numero: string;
    codePostal: string;
    localite: string;
    dateCreationEvenement: Date;
    categorieId: number;
    createurId: string;
    imageUrl: string;
    rowVersion: string;
    presentation: Presentation[];
    participants: Participation[];
    commentaires: Commentaire[];
    display: boolean;
    nbJaime: number;
    nbParticipant: number;
    displayInfo: boolean;

    constructor(nom: string, description: string, rue: string, numero: string, codePostal: string, localite: string, categorieId: number, createurId: string, rowVersion: string) {
        this.nom = nom;
        this.description = description;
        this.rue = rue;
        this.numero = numero;
        this.codePostal = codePostal;
        this.localite = localite;
        this.dateCreationEvenement = new Date();
        this.categorieId = categorieId;
        this.createurId = createurId;
        this.rowVersion = rowVersion;
    }

}