import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { EvenementService } from '../service/evenement.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-mes-evenements',
  templateUrl: './barre-navigation.component.html',
  styleUrls: ['./barre-navigation.component.css']
})
export class BarreNavigationComponent implements OnInit {

  @ViewChild('childModal') childModal: ModalComponent;
  title: string;
  content: string;

  constructor(private viewContainerRef: ViewContainerRef, private auth : AuthService , private router: Router, private eventService : EvenementService) { }

  ngOnInit() {
    
  }

  setAjouter()
  {
    this.eventService.setAjouter(true);
  }

  // Modal
  hide() {
    this.childModal.hide();
  }

  showModal(title, content) {
    this.title = title;
    this.content = content;
    this.childModal.show();
  }

  action(){
    this.auth.setCurrentUser(null);
    this.router.navigate(['connexion']);
  }
}
