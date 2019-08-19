import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { CategorieService } from '../service/categorie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Categorie } from '../model/Categorie';
import { Evenement } from '../model/Evenement';
import { Router } from '@angular/router';
import { EvenementService } from '../service/evenement.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  @ViewChild('childModal') childModal: ModalComponent;
  title: string;
  content: string;

  formEvent: FormGroup;
  categories: Categorie[];
  alreadyExist: boolean = false;
  evenementAModifier: Evenement;

  constructor(private viewContainerRef: ViewContainerRef, private toastr: ToastrService, private fb: FormBuilder, private Auth: AuthService, private categorieService: CategorieService, private router: Router, private eventService: EvenementService) {
    this.categories = [];
    this.title = "Présentations";
    this.content = 'Voulez-vous modifier les présentations liées à cet événement ?';
  }

  ngOnInit() {
    this.categorieService.getAllCategorie().subscribe((data: any) => {
      this.categories = data;
    });

    this.formEvent = this.fb.group({
      nomEvent: [null, [Validators.required, Validators.minLength(4)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      rue: [null, [Validators.required, Validators.minLength(4)]],
      numero: [null, Validators.required],
      codePostal: [null, [Validators.required, Validators.pattern('[0-9]{4}$')]],
      localite: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      categorie: [null, Validators.required],
    });

    if (!this.eventService.getAjouter()) {
      this.evenementAModifier = this.eventService.getEvent();
      this.formEvent.setValue({
        nomEvent: this.evenementAModifier.nom,
        description: this.evenementAModifier.description,
        rue: this.evenementAModifier.rue,
        numero: this.evenementAModifier.numero,
        codePostal: this.evenementAModifier.codePostal,
        localite: this.evenementAModifier.localite,
        categorie: this.evenementAModifier.categorieId,
      });
    }
  }

  saveEvent() {
    var formValue = this.formEvent.value;
    var rowVersion;

    if (!this.eventService.getAjouter()) {
      rowVersion = this.evenementAModifier.rowVersion;
    }

    var newEvent = new Evenement(
      formValue['nomEvent'],
      formValue['description'],
      formValue['rue'],
      formValue['numero'],
      formValue['codePostal'],
      formValue['localite'],
      formValue['categorie'],
      this.Auth.getCurrentUser().pseudo,
      rowVersion
    );

    if (this.eventService.getAjouter()) {
      this.eventService.saveEventUser(newEvent).subscribe((data: any) => {
        this.eventService.setEvent(data);
        this.router.navigate(['home/ajout-evenements/ajout-presentation']);
        this.toastr.success('L\'événement a bien été ajouter', 'Sauvegarde réussie', {
          timeOut: 3000,
        });
      },
        (error: HttpErrorResponse) => {
          if (error.status == 400) {
            this.alreadyExist = true;
          }
          else {
            this.toastr.error('L\'événement n\'a pas pu être sauvegarder.', 'Erreur', {
              timeOut: 3000,
            });
          }
        });
    }
    else {
      this.eventService.UpDateEventUser(newEvent).subscribe((data: any) => {
        this.eventService.setEvent(data);
        this.childModal.show();
        this.toastr.success('L\'événement a bien été modifier', 'Sauvegarde réussie', {
          timeOut: 3000,
        });
      },
        (error: HttpErrorResponse) => {
          if (error.status == 400) {
            this.alreadyExist = true;
          }
          else {
            this.toastr.error('L\'événement n\'a pas pu être modifier.', 'Erreur', {
              timeOut: 3000,
            });
          }
        });
    }
  }

  // Modal
  hide() {
    this.childModal.hide();
    this.router.navigate(['home/mes-evenements']);
  }

  action() {
    this.router.navigate(['home/ajout-evenements/ajout-presentation']);
  }
}
