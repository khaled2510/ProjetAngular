import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Evenement } from '../model/Evenement';
import { Commentaire } from '../model/Commentaire';
import { EvenementService } from '../service/evenement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommentaireService } from '../service/commentaire.service';
import { ModalComponent } from '../modal/modal.component';
import { ParticipationService } from '../service/participation.service';
import { NbJaimeService } from '../service/nb-jaime.service';

@Component({
  selector: 'app-evenements-creer',
  templateUrl: './evenements-creer.component.html',
  styleUrls: ['./evenements-creer.component.css']
})
export class EvenementCreerComponent implements OnInit {

  @ViewChild('childModal') childModal: ModalComponent;
  title: string;
  content: string;
  // contient le numéro représentant la méthode (modal)
  methode: any;
  // argument de la méthode appeler (modal)
  arg: any;

  evenements: Array<Evenement>;
  eventFound: boolean;
  // pour paging commentaires
  pageIndex: number;
  pageSize = 5;
  totalCount: number;
  numberPage: number;
  commentFound: boolean;

  // pour paging event
  pageIndexEvent: number;
  pageSizeEvent = 3;
  totalCountEvent: number;
  numberPageEvent: number;


  constructor(private nbJaimeService: NbJaimeService, private participationService: ParticipationService, private viewContainerRef: ViewContainerRef, private Auth: AuthService, private router: Router,
    private eventService: EvenementService, private toastr: ToastrService, private commentaireService: CommentaireService) {
    this.evenements = new Array<Evenement>();
    this.eventFound = true;
    this.commentFound = true;
  }

  ngOnInit() {
    this.eventService.countAll(this.Auth.getCurrentUser().pseudo).subscribe(data => {
      this.totalCountEvent = data;
      this.numberPageEvent = Math.ceil(this.totalCountEvent / this.pageSizeEvent);
    });
    this.pageIndexEvent = 0;
    this.eventService.setEvent(null);
    this.eventService.setAjouter(true);
    this.getEvent();
  }

  getEvent() {
    this.eventService.getAllEvenementCreat(this.Auth.getCurrentUser().pseudo, this.pageIndexEvent, this.pageSizeEvent).subscribe(data => {
      this.evenements = data;
      this.eventFound = this.evenements.length != 0;
      this.evenements.forEach(e => this.participationService.countParticipation(e.id).subscribe(data => {
        e.nbParticipant = data;
      }));
      this.evenements.forEach(e => this.nbJaimeService.countNbJaime(e.id).subscribe(data => {
        e.nbJaime = data;
      }));
    },
      (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.eventFound = false;
        }
        else {
          this.toastr.error('Nous n\'avons pas pu récupérer vos événements', 'Erreur', {
            timeOut: 3000,
          });
        }
      });
  }

  isDisplay(index, idEvent) {
    this.evenements.forEach(e => e.display = false);
    this.commentaireService.countAll(idEvent).subscribe(data => {
      this.totalCount = data;
      this.numberPage = Math.ceil(this.totalCount / this.pageSize);
    });
    this.pageIndex = 0;
    if (!this.evenements[index].commentaires) {
      this.getComment(index, idEvent, this.pageIndex, this.pageSize);
    }
    this.evenements[index].display = true;
  }

  getComment(index, idEvent, pageIndex, pageSize) {
    this.commentaireService.getCommentaireEvenement(idEvent, pageIndex, pageSize).subscribe((data: any) => {
      this.evenements[index].commentaires = data;
    },
      (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.commentFound = false;
          this.evenements[index].commentaires = undefined;
        }
        else {
          this.toastr.error('Une erreur est survenue lors de la récupération des commentaires', 'Erreur', {
            timeOut: 3000,
          });
        }
      });
  }

  notDisplay(index) {
    this.evenements[index].display = false;
  }

  previousCom(index, idEvent) {
    this.pageIndex = this.pageIndex - 1;
    this.getComment(index, idEvent, this.pageIndex, this.pageSize);
  }

  followingCom(index, idEvent) {
    this.pageIndex = this.pageIndex + 1;
    this.getComment(index, idEvent, this.pageIndex, this.pageSize);
  }

  previousEvent() {
    this.pageIndexEvent = this.pageIndexEvent - 1;
    this.getEvent();
  }

  followingEvent() {
    this.pageIndexEvent = this.pageIndexEvent + 1;
    this.getEvent();
  }

  deleteEvent(id: any) {
    this.eventService.deleteEvent(id).subscribe((data: any) => {
      this.toastr.success('L\'événement a bien été supprimer', 'Suppression réussie', {
        timeOut: 3000,
      });

      this.ngOnInit();
    },
      (error: HttpErrorResponse) => {
        this.toastr.error('L\'événement n\'a pas pu être supprimer', 'Erreur', {
          timeOut: 3000,
        });
      });
  }

  UpDateEvent(event: Evenement) {
    this.eventService.setEvent(event);
    this.eventService.setAjouter(false);
    this.router.navigate(['home/ajout-evenements']);
  }

  signaler(commentaire: Commentaire) {
    commentaire.signaler = 1;
    this.commentaireService.changeSignalement(commentaire).subscribe((data: any) => {
      this.toastr.success('Le commentaire a bien été signaler', 'Signalement réussie', {
        timeOut: 3000,
      });
    },
      (error: HttpErrorResponse) => {
        this.toastr.error('Le commentaire n\'a pas pu être signaler', 'Erreur', {
          timeOut: 3000,
        });
      });
  }

  // Modal
  hide() {
    this.childModal.hide();
  }

  showModal(title, content, methode, arg) {
    this.title = title;
    this.content = content;
    this.methode = methode;
    this.arg = arg;
    this.childModal.show();
  }

  action() {
    switch (this.methode) {
      case 1: {
        this.UpDateEvent(this.arg);
        break;
      }
      case 2: {
        this.deleteEvent(this.arg);
        break;
      }
      case 3: {
        this.signaler(this.arg);
        break;
      }
    }
  }
}
