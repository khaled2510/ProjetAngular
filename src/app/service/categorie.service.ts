import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Categorie } from '../model/Categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private http : HttpClient;

  constructor(http: HttpClient, private auth: AuthService) {
    this.http = http;
  }

  getAllCategorie(): Observable<Categorie[]>
  {
    var reqHeader = new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Bearer '+this.auth.getToken()});
    return this.http.get<Categorie[]>(this.auth.apiBaseUrl+'/Categorie', {headers: reqHeader});
  }

}
