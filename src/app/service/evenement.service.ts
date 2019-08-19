import { Injectable } from '@angular/core';
import { Evenement } from '../model/Evenement';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Presentation } from '../model/Presentation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  private eventUpdate : Evenement;
  private ajouter : boolean = true;
  private http : HttpClient;

  constructor(http: HttpClient, private auth: AuthService) {
    this.http = http;
  }

  setEvent(event : Evenement)
  {
    this.eventUpdate = event;
  }
  getEvent()
  {
    return this.eventUpdate;
  }
  getAjouter()
  {
    return this.ajouter;
  }
  setAjouter(ajouter)
  {
    this.ajouter = ajouter;
  }

  countAll(pseudo: string)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.get<number>(this.auth.apiBaseUrl+'/Evenement/count/'+pseudo, {headers: reqHeader});
  }

  saveEventUser(newEvent : Evenement)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.post(this.auth.apiBaseUrl+'/Evenement', newEvent, {headers: reqHeader});
  }
  
  UpDateEventUser(newEvent : Evenement)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.put(this.auth.apiBaseUrl+'/Evenement/'+this.getEvent().id, newEvent, {headers: reqHeader});
  }

  savePresentation(newPresentation : Presentation)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.post(this.auth.apiBaseUrl+'/Presentation', newPresentation, {headers: reqHeader});
  }

  deleteEvent(id : number)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.delete(this.auth.apiBaseUrl+'/Evenement/'+id, {headers: reqHeader});
  }

  getEvenement(id: number): Observable<Evenement>
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.get<Evenement>(this.auth.apiBaseUrl+'/Evenement/'+id, {headers: reqHeader});
  }

  getAllEvenementCreat(pseudo: string, pageIndexEvent: number, pageSizeEvent: number): Observable<Evenement[]>
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.get<Evenement[]>(this.auth.apiBaseUrl+'/Evenement/pseudo/'+pseudo+'/'+pageSizeEvent+'/'+pageIndexEvent, {headers: reqHeader});
  }

  deletePresentation(id : number)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.delete(this.auth.apiBaseUrl+'/Presentation/'+id, {headers: reqHeader});
  }

  getAllPresEvent(id : number): Observable<Presentation[]>{
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.get<Presentation[]>(this.auth.apiBaseUrl+'/Presentation/'+id, {headers: reqHeader});
  }
}
