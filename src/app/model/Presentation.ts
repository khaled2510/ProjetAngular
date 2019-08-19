export class Presentation{
    id: number;
    dateHeureDebut: Date;
    dateHeureFin: Date;
    evenementId: number;

    constructor(dateHeureDebut: Date,dateHeureFin: Date,evenementId: number)
    {
        this.dateHeureDebut = dateHeureDebut;
        this.dateHeureFin = dateHeureFin;
        this.evenementId = evenementId;
    }
}