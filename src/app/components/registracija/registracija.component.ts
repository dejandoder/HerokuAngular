import { Component, OnInit, ElementRef } from '@angular/core';
import { Korisnik } from 'src/app/model/Korisnik';
import { KorisnikService } from 'src/app/service/korisnik.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  validacija: boolean = true;
  validacijaIme: boolean = false;
  validacijaPrezime: boolean = false;
  validacijaMail: boolean = false;
  validacijaAdresa: boolean = false;
  validacijaGrad: boolean = false;
  validacijaDrzava: boolean = false;
  validacijaBroj: boolean = false;
  validacijaJedinstveni: boolean = false;
  validacijaLozinka: boolean = false;
  ponovljenaLozinka: string = "";
  validacijaLozinkaPonovljena: boolean = false;

  constructor(private korisnikService: KorisnikService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
  }

  registujSe() {

    if (this.korisnik.ime == "") {
      this.validacijaIme = true;
      this.validacija = false;
    }

    if (this.korisnik.prezime == "") {
      this.validacijaPrezime = true;
      this.validacija = false;
    }

    if (this.korisnik.email == "") {
      this.validacijaMail = true;
      this.validacija = false;
    }

    if (this.korisnik.adresa == "") {
      this.validacijaAdresa = true;
      this.validacija = false;
    }

    if (this.korisnik.grad == "") {
      this.validacijaGrad = true;
      this.validacija = false;
    }

    if (this.korisnik.drzava == "") {
      this.validacijaDrzava = true;
      this.validacija = false;
    }

    if (this.korisnik.brojTelefona == null) {
      this.validacijaBroj = true;
      this.validacija = false;
    }

    if (this.korisnik.jedinstveniBroj == null) {
      this.validacijaJedinstveni = true;
      this.validacija = false;
    }

    if (this.korisnik.password == "") {
      this.validacijaLozinka = true;
      this.validacija = false;
    }

    if (this.ponovljenaLozinka != this.korisnik.password) {
      this.toastr.error("Lozinke se ne poklapaju");
      this.validacijaLozinkaPonovljena = true;
      this.validacija = false;
    }

    if(!validateEmail(this.korisnik.email)){
      this.toastr.error("E-mail nije validan");
      this.validacija = false;
    }

    if (!this.validacija) {
      this.toastr.warning("Neuspjesna registracija");
      this.validacija = true;
    } else {
      this.korisnik.username = this.korisnik.email;
      this.korisnikService.registracija(this.korisnik).subscribe(
        data => {
          this.toastr.info("Dobicete e-mail za verifikaciju!");
        },
        error => {
          this.toastr.error("Nalog sa navedenom e-mail adresom vec postoji!");
        }
      );
    }
  }
  odustani() {
    this.router.navigate(['/pocetna']);
  }



}

function validateEmail(email) 
{
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}