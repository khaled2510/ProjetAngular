import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Presentation } from '../model/Presentation';
import { EvenementService } from '../service/evenement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-add-presentation',
  templateUrl: './add-presentation.component.html',
  styleUrls: ['./add-presentation.component.css']
})
export class AddPresentationComponent implements OnInit {

  @ViewChild('childModal') childModal: ModalComponent;
  title: string;
  content: string;
  
  formPresentation: FormGroup;
  presentations : Array<Presentation>;
  idPresentation : number;

  constructor(private viewContainerRef: ViewContainerRef, private toastr: ToastrService, private fb: FormBuilder, private eventService: EvenementService, private router: Router) {
    this.presentations = new Array<Presentation>();
    this.title = "Suppression présentation";
    this.content = "Voulez-vous supprimer la présentation selectionnée ?";
  }

  ngOnInit() {
    if (!this.eventService.getAjouter()){
      this.eventService.getAllPresEvent(this.eventService.getEvent().id).subscribe(data => {
        this.presentations = data;
      });
    }

    this.formPresentation = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required]
    });
  }

  savePresentation() {
    var formValue = this.formPresentation.value;
    var newPresentation = new Presentation(
      formValue['dateDebut'],
      formValue['dateFin'],
      this.eventService.getEvent().id,
    );

    if (this.compareDate(newPresentation.dateHeureDebut, new Date()) == -1) {
      this.toastr.error('La date de début ne peut pas être entérieure à la date du jour !', 'Erreur', {
        timeOut: 4000,
      });
    }
    else {
      if (this.compareDate(newPresentation.dateHeureDebut, newPresentation.dateHeureFin) == 1) {
        this.toastr.error('La date de fin doit être postérieure à la date de début !', 'Erreur', {
          timeOut: 4000,
        });
      }
      else {
        this.eventService.savePresentation(newPresentation).subscribe((data: any) => {
          this.presentations.push(data);
          this.toastr.success('La présentation a bien été ajouter', 'Sauvegarde réussie', {
            timeOut: 3000,
          });
        },
          (error: HttpErrorResponse) => {
            this.toastr.error('Une erreur est survenue lors de l\'jout', 'Erreur', {
              timeOut: 3000,
            });
          });
      }
    }
  }

  // Comparaison de dates
  compareDate(date1: Date, date2: Date): number {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    // Check if the dates are equal
    let same = d1.getTime() === d2.getTime();
    if (same) return 0;
    // Check if the first is greater than second
    if (d1 > d2) return 1;
    // Check if the first is less than second
    if (d1 < d2) return -1;
  }

  // Modal
  showModal(index : number) {
    this.childModal.show();
    this.idPresentation = this.presentations[index].id;
  }

  action() {
    this.eventService.deletePresentation(this.idPresentation).subscribe(data => {
      this.toastr.success('La présentation a bien été supprimer', 'Suppression réussie', {
        timeOut: 3000,
      });
      this.eventService.getAllPresEvent(this.eventService.getEvent().id).subscribe(data => {
        this.presentations = data;
      });
    },
    (error: HttpErrorResponse) => {
      this.toastr.error('La présentation n\'a pas pu être supprimer', 'Erreur', {
        timeOut: 3000,
      });
    });
  }
}
