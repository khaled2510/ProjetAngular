import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Commentaire } from '../model/Commentaire';
import { CommentaireService } from '../service/commentaire.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { EvenementService } from '../service/evenement.service';
import { Evenement } from '../model/Evenement';

@Component({
  selector: 'app-traitement-suppression',
  templateUrl: './traitement-suppression.component.html',
  styleUrls: ['./traitement-suppression.component.css']
})
export class TraitementSuppressionComponent implements OnInit {

  @ViewChild('childModal') childModal: ModalComponent;
  title: string;
  content: string;

  // pour paging commentaires
  pageIndex: number;
  pageSize = 10;
  totalCount: number;
  numberPage: number;

  private commentairesSignaler: Commentaire[];
  private evenement: Evenement;

  constructor(private eventService: EvenementService, private viewContainerRef: ViewContainerRef, private commentaireService: CommentaireService, private Auth: AuthService, private router: Router, private toastr: ToastrService) {
    this.commentairesSignaler = [];
  }

  ngOnInit() {
    this.commentaireService.countReport().subscribe(data => {
      this.totalCount = data;
      this.numberPage = Math.ceil(this.totalCount / this.pageSize);
    });
    this.pageIndex = 0;
    this.getCommentaire();
  }

  private getCommentaire() {
    this.commentaireService.getCommentaireSignaler(this.pageIndex, this.pageSize).subscribe(data => {
      this.commentairesSignaler = data;
    },
      (error: HttpErrorResponse) => {
        this.toastr.error('Les commentaires signalés n\'ont pas pu être récupérés', 'Erreur', {
          timeOut: 3000,
        });
      });
  }

  deleteCom(commentaire: Commentaire) {
    this.commentaireService.deleteCom(commentaire.id).subscribe((data: any) => {
      this.toastr.success('Le commentaire signalé a bien été supprimer', 'Suppression', {
        timeOut: 3000,
      });
    },
      (error: HttpErrorResponse) => {
        this.toastr.error('Le commentaire signaler n\'a pas pu être supprimer', 'Erreur', {
          timeOut: 3000,
        });
      });
    this.commentairesSignaler = this.commentairesSignaler.filter(obj => obj !== commentaire);
  }

  rejectCom(commentaire: Commentaire) {
    commentaire.signaler = 2;
    this.commentaireService.changeSignalement(commentaire).subscribe((data: any) => {
      this.toastr.success('Le commentaire signalé a bien été rejeter', 'Suppression', {
        timeOut: 3000,
      });
    },
      (error: HttpErrorResponse) => {
        this.toastr.error('Le commentaire signaler n\'a pas pu être rejeter', 'Erreur', {
          timeOut: 3000,
        });
      });
    this.commentairesSignaler = this.commentairesSignaler.filter(obj => obj !== commentaire);
  }

  displayEvent(id: number) {
    this.eventService.getEvenement(id).subscribe(data => {
      this.evenement = data;
      this.showModal(this.evenement.nom, this.evenement.createurId, this.evenement.description);
    },
      (error: HttpErrorResponse) => {
        this.toastr.error('Nous n\'avons pas pu récupérer l\'événement.', 'Erreur', {
          timeOut: 3000,
        });
      });
  }

  previous() {
    this.pageIndex = this.pageIndex - 1;
    this.getCommentaire();
  }

  following() {
    this.pageIndex = this.pageIndex + 1;
    this.getCommentaire();
  }

  // Modal
  showModal(title, createurId, content) {
    this.title = title+" / Créateur: "+createurId;
    this.content = content;
    this.childModal.show();
  }
}
