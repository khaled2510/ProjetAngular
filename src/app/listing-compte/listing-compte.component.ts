import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Constante } from '../model/Constante';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilisateur } from '../model/Utilisateur';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-listing-compte',
  templateUrl: './listing-compte.component.html',
  styleUrls: ['./listing-compte.component.css']
})
export class ListingCompteComponent implements OnInit {

  @ViewChild('childModal') childModal: ModalComponent;
  title: string;
  content: string;

  totalAcountAdmin: number;
  totalAcountPro: number;
  totalAcountSub: number;

  recherche = this.fb.group({
    nomUtilisateur : ['', Validators.required],
  });

  userFound: Utilisateur;
  constanteRoles = new Constante();

  constructor(private viewContainerRef: ViewContainerRef, private auth: AuthService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.auth.countAcount(this.constanteRoles.roles[0]).subscribe(data => {
      this.totalAcountAdmin = data;
    });
    this.auth.countAcount(this.constanteRoles.roles[1]).subscribe(data => {
      this.totalAcountPro = data;
    });
    this.auth.countAcount(this.constanteRoles.roles[2]).subscribe(data => {
      this.totalAcountSub = data;
    });
  }

  onSubmit(){
    this.auth.getUtilisateurCourrent(this.recherche.get('nomUtilisateur').value).subscribe(data => {
      this.userFound = data;
    },
    (error: HttpErrorResponse)=>{
      this.userFound = null;
      this.toastr.error('Le pseudo rechercher n\'existe pas.', 'Erreur', {
        timeOut: 3000,
      });
    });
  }

  deleteAcount(){
    this.auth.deleteAcount(this.userFound.pseudo).subscribe(data => {
      this.toastr.success('Le compte a bien été supprimer.', 'Suppression', {
        timeOut: 3000,
      });
      this.userFound = null;
    },
    (error: HttpErrorResponse)=>{
      this.toastr.error('Le compte n\'a pas pu être supprimer.', 'Erreur', {
        timeOut: 3000,
      });
    });
  }

  // Modal
  showModal(title, content) {
    this.title = title;
    this.content = content;
    this.childModal.show();
  }
}
