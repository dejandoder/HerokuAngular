import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from '@ag-grid-community/angular';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacijentComponent } from './components/pacijent/pacijent.component';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { PrijavaComponent } from './components/prijava/prijava.component';
import { PocetnaStranicaComponent } from './components/pocetna-stranica/pocetna-stranica.component';
import { ProfilComponent } from './components/pacijent/profil/profil.component';
import { KlinikaComponent } from './components/pacijent/klinika/klinika.component';
import { ZdravstveniKartonComponent } from './components/pacijent/zdravstveni-karton/zdravstveni-karton.component';
import { IstorijaComponent } from './components/pacijent/istorija/istorija.component';
import { PocetnaPacijentComponent } from './components/pacijent/pocetna-pacijent/pocetna-pacijent.component';
import { PregledComponent } from './components/pacijent/pregled/pregled.component';
import { AuthInterceptor } from './http-interceptor/AuthInterceptor';
import { AuthService } from './service/AuthService';
import { DatePipe, CommonModule } from '@angular/common';
import { ZakazaniPreglediComponent } from './components/pacijent/zakazani-pregledi/zakazani-pregledi.component';
import { MatTableModule, MatSortModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ZakazivanjePregledaComponent } from './components/pacijent/zakazivanje-pregleda/zakazivanje-pregleda.component';


@NgModule({
  declarations: [
    AppComponent,
    PacijentComponent,
    RegistracijaComponent,
    PrijavaComponent,
    PocetnaStranicaComponent,
    ProfilComponent,
    KlinikaComponent,
    ZdravstveniKartonComponent,
    IstorijaComponent,
    PocetnaPacijentComponent,
    PregledComponent,
    ZakazaniPreglediComponent,
    ZakazivanjePregledaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    MatSortModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [
    DatePipe,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
