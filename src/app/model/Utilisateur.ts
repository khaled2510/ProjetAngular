import { Evenement } from "./Evenement";

export class Utilisateur{
    pseudo: string;
    nom: string;
    prenom : string;
    email : string;
    motDePasse: string;
    role: string;
    evenements: Evenement[];

    constructor(pseudo: string,nom: string,prenom : string,email : string,motDePasse: string,role: string){
        this.pseudo = pseudo;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.role = role;
    }
}