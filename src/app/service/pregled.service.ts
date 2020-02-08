import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pregled } from '../model/Pregled';

@Injectable({
  providedIn: 'root'
})
export class PregledService {

  constructor(private http: HttpClient) { }

  preuzmiSvePreglede() {
    return this.http.get<any>('api/pregledi/all');
  }

  zakaziDostupniPregled(pregled: Pregled) {
    return this.http.post<any>("api/pregledi/zakaziDostupni", pregled);
  }

  zakaziNoviPregled(pregled: Pregled) {
    return this.http.post<any>("api/pregledi/zakaziNovi", pregled);
  }

  otkaziPregled(pregled: Pregled) {
    return this.http.post<any>("api/pregledi/otkazi", pregled);
  }

  preuzmiZakazanePreglede() {
    return this.http.get<any>('api/pregledi/zakazani');
  }

  preuzmiIstoriju() {
    return this.http.get<any>('api/pregledi/istorija');
  }

  preuzmiDostupnePreglede() {
    return this.http.get<any>('api/pregledi/sviDostupni');
  }

  preuzmiTipovePregleda(){
    return this.http.get<any>('api/tipovi/all');
  }

}
