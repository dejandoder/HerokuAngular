import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from '../model/Korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  registracija(korisnik: Korisnik) {
    return this.http.post<Korisnik>('api/korisnici/registracija', korisnik);
  }

  vratiTrenutnogKorisnika() {
    return this.http.get<any>('api/korisnici/trenutniKorisnik');
  }

  izmjenaPodataka(korisnik: Korisnik) {
    return this.http.post<Korisnik>('api/korisnici/izmjena', korisnik);
  }

  izmjenaLozinke(novaLozinka: string) {
    return this.http.post<any>('api/korisnici/izmjenaLozinke', novaLozinka);
  }
 
}
