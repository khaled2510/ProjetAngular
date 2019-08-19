import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NbJaimeService {

  private http : HttpClient;

  constructor(http: HttpClient, private auth: AuthService) {
    this.http = http;
  }

  countNbJaime(idEvent)
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.get<number>(this.auth.apiBaseUrl+'/NbJaime/count/'+idEvent, {headers: reqHeader});
  }
}
