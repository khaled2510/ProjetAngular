import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Utilisateur } from '../model/Utilisateur';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Constante } from '../model/Constante';

@Component({
  selector: 'app-ajout-compte',
  templateUrl: './ajout-compte.component.html',
  styleUrls: ['./ajout-compte.component.css']
})
export class AjoutCompteComponent implements OnInit {

  constanteRoles = new Constante();
  roles = this.constanteRoles.roles;
  inscription : FormGroup;

  constructor(private fb: FormBuilder, private Auth: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.inscription = this.fb.group({
      nomUtilisateur : [null, [Validators.required, Validators.minLength(4)]],
      nom : [null, [Validators.required, Validators.minLength(4)]],
      prenom : [null, [Validators.required, Validators.minLength(4)]],
      email : [null, [Validators.required, Validators.email]],
      motDePasse : [null, [Validators.required, Validators.minLength(3)]],
      confirmMotDePasse : [null, [Validators.required, Validators.minLength(3)]],
      rolesControl : [this.roles[0], Validators.required]
    });
  }

  saveUser()
  {
    var formValue = this.inscription.value;
    if(formValue['motDePasse'] != formValue['confirmMotDePasse']){
      this.toastr.error('Les champs "mot de passe" doivent être identiques.' , 'Erreur', {
        timeOut: 5000,
      });
    }
    else{
      var newUser = new Utilisateur(
        formValue['nomUtilisateur'],
        formValue['nom'],
        formValue['prenom'],
        formValue['email'],
        formValue['motDePasse'],
        formValue['rolesControl']
      );
      this.Auth.saveUser(newUser).subscribe((data: any)=>{
        this.toastr.success('Le nouveau compte a bien été ajouter', 'Sauvegarde réussie', {
          timeOut: 3000,
        });
        this.router.navigate(['admin/listing-compte']);
      },
      (error: HttpErrorResponse)=>{
        if (error.status == 400) {
          this.toastr.error('Le nom d\'utilisateur est déjâ existant.' , 'Erreur', {
            timeOut: 3000,
          });
        }
        else {
          this.toastr.error('Un problème est survenu lors de l\'enregistrement.', 'Erreur', {
            timeOut: 3000,
          });
        }
      });
    }
  }
}
