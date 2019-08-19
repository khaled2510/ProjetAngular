import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginModel } from '../model/LoginModel';
import { Constante } from '../model/Constante';
import * as jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  connexion = this.fb.group({
    nomUtilisateur: ['', Validators.required],
    motDePasse: ['', Validators.required]
  });

  constanteRoles = new Constante();
  nomUtilisateur: string;
  motDePasse: string;
  user: LoginModel;

  constructor(private fb: FormBuilder, private Auth: AuthService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.user = new LoginModel(this.connexion.get('nomUtilisateur').value,
      this.connexion.get('motDePasse').value);

    this.Auth.userAuthentication(this.user).subscribe((data: any) => {
      //localStorage.setItem('userToken',data.access_token);
      let tokenInfo = this.getDecodedAccessToken(data.access_token);

      if (tokenInfo.roles != this.constanteRoles.roles[2]) {
        this.Auth.setToken(data.access_token);
        this.Auth.getUtilisateurCourrent(this.user.UserName).subscribe(data => {
          this.Auth.setCurrentUser(data);
          if (this.Auth.getRole() == this.constanteRoles.roles[1]) {
            this.router.navigate(['home']);
          }
          else {
            this.router.navigate(['admin']);
          }
        });
      }
      else {
        this.toastr.error('Site autorisé uniquement aux administrateurs et professionnels.', 'Erreur', {
          timeOut: 3000,
        });
      }
    },
      (error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.toastr.error('Nom d\'utilisateur ou mot de passe incorrect.', 'Erreur', {
            timeOut: 3000,
          });
        }
        else {
          this.toastr.error('Un problème est survenue lors de la connexion.', 'Erreur', {
            timeOut: 3000,
          });
        }
      });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }
}
