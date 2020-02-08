import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Klinika } from '../model/Klinika';

@Injectable({
  providedIn: 'root'
})
export class KlinikaService {

  constructor(private http: HttpClient) { }

  preuzmiSveKlinike(){
    return this.http.get<any>('api/klinike/all');
  }

  pretragaKlinika(tipPregleda: string, ocjena: number, lokacija: string){
    return this.http.post<any>("api/klinike/pretragaKlinika", { tipPregleda: tipPregleda, ocjenaKlinike: ocjena, lokacijaKlinike: lokacija})
  }

  ocijeniKliniku(ocjena: number, klinika: Klinika){
    return this.http.post<any>("api/klinike/ocijeniKliniku/"+ ocjena, klinika)
  }
}
