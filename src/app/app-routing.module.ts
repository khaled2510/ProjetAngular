import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { BarreNavigationComponent } from './barre-navigation/barre-navigation.component';
import { AuthGuard } from './auth.guard';
import { RoleGuardService } from './service/role-guard.service';
import { EvenementCreerComponent } from './evenements-creer/evenements-creer.component';
import { AddEventComponent } from './add-event/add-event.component';
import { BarreNavigationAdminComponent } from './barre-navigation-admin/barre-navigation-admin.component';
import { AjoutCompteComponent } from './ajout-compte/ajout-compte.component';
import { TraitementSuppressionComponent } from './traitement-suppression/traitement-suppression.component';
import { AddPresentationComponent } from './add-presentation/add-presentation.component';
import { ListingCompteComponent } from './listing-compte/listing-compte.component';

const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full'},
  { path: 'connexion', component: ConnexionComponent},
  { 
    path: 'home', 
    component: BarreNavigationComponent, 
    canActivate: [AuthGuard], 
    children: [
      {path: '', redirectTo: 'mes-evenements', pathMatch: 'full'},
      {path: 'mes-evenements', component: EvenementCreerComponent, canActivate: [RoleGuardService],data:{role:"Professional"}},
      {path: 'ajout-evenements', component: AddEventComponent, canActivate: [RoleGuardService],data:{role:"Professional"}},
      {path: 'ajout-evenements/ajout-presentation', component: AddPresentationComponent, canActivate: [RoleGuardService],data:{role:"Professional"}}
    ]
  },
  {
    path: 'admin',
    component: BarreNavigationAdminComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'listing-compte', pathMatch: 'full'},
      {path: 'listing-compte', component: ListingCompteComponent, canActivate: [RoleGuardService],data:{role:"Admin"}},
      {path: 'traitement-suppression', component: TraitementSuppressionComponent, canActivate: [RoleGuardService],data:{role:"Admin"}},
      {path: 'ajout-compte', component: AjoutCompteComponent, canActivate: [RoleGuardService],data:{role:"Admin"}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
