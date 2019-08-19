import { Injectable } from '@angular/core';
import { Commentaire } from '../model/Commentaire';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private http : HttpClient;

  constructor(http: HttpClient, private auth: AuthService) {
    this.http = http;
  }

  changeSignalement(commentaire : Commentaire)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.put(this.auth.apiBaseUrl+'/Commentaire/'+commentaire.id, commentaire, {headers: reqHeader});
  }  

  getCommentaireSignaler(pageIndex, pageSize): Observable<Commentaire[]>
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.get<Commentaire[]>(this.auth.apiBaseUrl+'/Commentaire/report/'+pageSize+'/'+pageIndex, {headers: reqHeader});
  }

  getCommentaireEvenement(idEvent, pageIndex, pageSize): Observable<Commentaire[]>
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.get<Commentaire[]>(this.auth.apiBaseUrl+'/Commentaire/commentEvent/'+idEvent+'/'+pageSize+'/'+pageIndex, {headers: reqHeader});
  }

  countAll(idEvent)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.get<number>(this.auth.apiBaseUrl+'/Commentaire/'+idEvent, {headers: reqHeader});
  }

  countReport()
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.get<number>(this.auth.apiBaseUrl+'/Commentaire/report', {headers: reqHeader});
  }
  
  deleteCom(id : number)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.delete(this.auth.apiBaseUrl+'/Commentaire/'+id, {headers: reqHeader});
  }
}
