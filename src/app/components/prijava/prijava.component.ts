import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Korisnik } from 'src/app/model/Korisnik';
import { AuthService } from 'src/app/service/AuthService';
import { KorisnikService } from 'src/app/service/korisnik.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  user: Korisnik = new Korisnik();
  validacija: boolean = true;
  validacijaKorisnickoIme: boolean = false;
  validacijaLozinka: boolean = false;

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router, private route: ActivatedRoute, private userService: KorisnikService, private serviceOdjava: AuthService) {
    if (!this.authService.isUserLogged()) {
      this.router.navigate(['/login']);
    } else {
      if (localStorage.getItem("ROLE") == "ADMIN_SISTEM") {
        this.router.navigate(['/adminSistema']);
      }

      else if (localStorage.getItem("ROLE") == "REGISTROVAN") {
        this.router.navigate(['/registrovan']);
      }

    }
  }

  ngOnInit() {
  }


  clickLogIn() {

    if (this.user.username == "") {
      this.validacijaKorisnickoIme = true;
      this.validacija = false;

    }

    if (this.user.password == "") {
      this.validacijaLozinka = true;
      this.validacija = false;
    }

    if (!this.validacija) {
      this.toastr.warning("Neuspjesna prijava");
      this.validacija = true;
    } else {
      this.authService.login(this.user).subscribe(
        success => {

          if (!success) {
            this.toastr.error("Neispravni kredencijali");
          } else {
            this.authService.getCurrentUser().subscribe(
              data => {
                localStorage.setItem("ROLE", data.role);
                localStorage.setItem("USERNAME", data.username);
                if (localStorage.getItem("ROLE") == "REGISTROVAN") {
                  this.router.navigate(["/registrovan"]);
                } else {
                  this.router.navigate(["/pocetna"]);
                }
              }
            )
          }
        }
      )
    }
  }

  odustani() {
    this.router.navigate(['/pocetna']);
  }

}
