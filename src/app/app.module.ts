import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlashMessagesModule} from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { CreateAccountComponent } from './register/create-account/create-account.component';
import { DropdownDirective } from './shared/dropdown.directive';
import {RouterModule, Routes} from '@angular/router';

import { HttpModule } from '@angular/http';
import { RegisterAuthService } from './services/register-auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard} from './guards/auth.guard';
import { NotAuthGuard} from './guards/notAuth.guard';
import { CreateOrganizationComponent } from './register/create-organization/create-organization.component';
import { CreateSportComponent } from './register/create-sport/create-sport.component';
import {SportAuthService} from './services/sport-auth.service';
import { BasketballSchemaComponent} from './dashboard/basketball-schema/basketball-schema.component';
import { BaseballSchemaComponent } from './dashboard/baseball-schema/baseball-schema.component';
import { FootballSchemaComponent } from './dashboard/football-schema/football-schema.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { AddAthleteComponent } from './dashboard/add-athlete/add-athlete.component';
import { AddRecruitComponent } from './dashboard/add-recruit/add-recruit.component';
import { AdminComponent } from './admin/admin.component';
import { SingleAthleteComponent } from './dashboard/single-athlete/single-athlete.component';

const appRoutes: Routes = [
  {path : '', component: LoginComponent, canActivate : [NotAuthGuard]},
  {path : 'register', component: CreateAccountComponent, canActivate : [NotAuthGuard]},
  {path : 'dashboard', component: DashboardComponent, canActivate : [AuthGuard]},
  {path : 'dashboard/:name/:id', component: SingleAthleteComponent, canActivate : [AuthGuard]},
  {path : 'profile', component: ProfileComponent, canActivate : [AuthGuard]},
  {path : 'admin', component: AdminComponent, canActivate : [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    CreateAccountComponent,
    DropdownDirective,
    DashboardComponent,
    ProfileComponent,
    CreateOrganizationComponent,
    CreateSportComponent,
    BasketballSchemaComponent,
    BaseballSchemaComponent,
    FootballSchemaComponent,
    SideBarComponent,
    AddAthleteComponent,
    AddRecruitComponent,
    AdminComponent,
    SingleAthleteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FlashMessagesModule,
    ClarityModule.forRoot(),
  ],
  providers: [RegisterAuthService, SportAuthService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
