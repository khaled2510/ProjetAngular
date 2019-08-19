import { Injectable } from '@angular/core';
import { Utilisateur } from '../model/Utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Evenement } from '../model/Evenement';
import { tap } from 'rxjs/operators';
import { Presentation } from '../model/Presentation';
import { Commentaire } from '../model/Commentaire';
import { LoginModel } from '../model/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser : Utilisateur;
  private http : HttpClient;
  apiBaseUrl : string;
  private token : string;

  constructor(http: HttpClient) {
    this.http = http;
    this.apiBaseUrl = "https://agendanam2.azurewebsites.net/api";
  }
   
  userAuthentication(user : LoginModel)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.apiBaseUrl+'/jwt', user, {headers: reqHeader});
  } 

  setToken(token: any)
  {
    this.token = token;
  }

  getToken()
  {
    return this.token;
  }

  getUtilisateurCourrent(userName: string): Observable<Utilisateur>
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.token});
    return this.http.get<Utilisateur>(this.apiBaseUrl+'/Utilisateur/'+userName, {headers: reqHeader});
  }

  getCurrentUser()
  {
    return this.currentUser;
  }
  
  isLoggedIn(){
    return this.currentUser != null;
  }

  setCurrentUser(data : any)
  {
    this.currentUser = data;
  }

  getRole()
  {
    return this.currentUser.role;
  }

  saveUser(newUser : Utilisateur)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.token});
    return this.http.post(this.apiBaseUrl+'/Utilisateur', newUser, {headers: reqHeader});
  }

  countAcount(role: string){
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.token});
    return this.http.get<number>(this.apiBaseUrl+'/Utilisateur/count/'+role, {headers: reqHeader});
  }

  deleteAcount(pseudo: string){
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.token});
    return this.http.delete(this.apiBaseUrl+'/Utilisateur/'+pseudo, {headers: reqHeader});
  }
}
