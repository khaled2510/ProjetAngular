import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { BarreNavigationComponent } from './barre-navigation/barre-navigation.component';
import { AuthGuard } from './auth.guard';
import { AddEventComponent } from './add-event/add-event.component';
import { EvenementCreerComponent } from './evenements-creer/evenements-creer.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { BarreNavigationAdminComponent } from './barre-navigation-admin/barre-navigation-admin.component';
import { AjoutCompteComponent } from './ajout-compte/ajout-compte.component';
import { TraitementSuppressionComponent } from './traitement-suppression/traitement-suppression.component';
import { CategorieService } from './service/categorie.service';
import { AddPresentationComponent } from './add-presentation/add-presentation.component';
import { EvenementService } from './service/evenement.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalComponent } from './modal/modal.component';
import { ListingCompteComponent } from './listing-compte/listing-compte.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    BarreNavigationComponent,
    AddEventComponent,
    EvenementCreerComponent,
    BarreNavigationAdminComponent,
    AjoutCompteComponent,
    TraitementSuppressionComponent,
    AddPresentationComponent,
    ModalComponent,
    ListingCompteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [AuthGuard, AuthService, CategorieService, EvenementService],
  bootstrap: [AppComponent],
})
export class AppModule { }
