import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocetnaStranicaComponent } from './components/pocetna-stranica/pocetna-stranica.component';
import { PrijavaComponent } from './components/prijava/prijava.component';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { PacijentComponent } from './components/pacijent/pacijent.component';
import { ProfilComponent } from './components/pacijent/profil/profil.component';
import { IstorijaComponent } from './components/pacijent/istorija/istorija.component';
import { KlinikaComponent } from './components/pacijent/klinika/klinika.component';
import { ZdravstveniKartonComponent } from './components/pacijent/zdravstveni-karton/zdravstveni-karton.component';
import { PocetnaPacijentComponent } from './components/pacijent/pocetna-pacijent/pocetna-pacijent.component';
import { PregledComponent } from './components/pacijent/pregled/pregled.component';
import { ZakazaniPreglediComponent } from './components/pacijent/zakazani-pregledi/zakazani-pregledi.component';
import { ZakazivanjePregledaComponent } from './components/pacijent/zakazivanje-pregleda/zakazivanje-pregleda.component';
import { AuthGuard } from './guards/AuthGuard';
import { PacijentGuard } from './guards/PacijentGuard';


const routes: Routes = [
  { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
  { path: 'pocetna', component: PocetnaStranicaComponent },
  { path: 'login', component: PrijavaComponent, canActivate:[AuthGuard]},
  { path: 'registracija', component: RegistracijaComponent },
  {
    path: 'registrovan', component: PacijentComponent, canActivate: [PacijentGuard],
    children: [
      { path: '', redirectTo: 'pocetnaPacijent',  pathMatch: 'full' },
      {path: 'pocetnaPacijent', component: PocetnaPacijentComponent},
      {path: 'pregledi', component: PregledComponent},
      {path: 'profil', component: ProfilComponent},
      {path: 'istorija', component: IstorijaComponent},
      {path: 'klinika', component: KlinikaComponent},
      {path: 'karton', component: ZdravstveniKartonComponent},
      {path: 'zakazaniPregledi', component: ZakazaniPreglediComponent},
      {path: 'zakazivanje', component: ZakazivanjePregledaComponent},
      {path: '**', redirectTo: 'pocetnaPacijent'}
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
