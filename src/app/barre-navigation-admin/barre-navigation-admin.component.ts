import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-barre-navigation-admin',
  templateUrl: './barre-navigation-admin.component.html',
  styleUrls: ['./barre-navigation-admin.component.css']
})
export class BarreNavigationAdminComponent implements OnInit {

  @ViewChild('childModal') childModal: ModalComponent;
  title: string;
  content: string;

  constructor(private viewContainerRef: ViewContainerRef, private auth : AuthService, private router: Router) { }

  ngOnInit() {
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
