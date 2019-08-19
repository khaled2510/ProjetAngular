import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  private http : HttpClient;

  constructor(http: HttpClient, private auth: AuthService) {
    this.http = http;
  }

  countParticipation(idEvent)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.get<number>(this.auth.apiBaseUrl+'/Participation/count/'+idEvent, {headers: reqHeader});
  }
}
