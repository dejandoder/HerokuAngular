import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ljekar } from '../model/Ljekar';

@Injectable({
  providedIn: 'root'
})
export class LjekarService {

  constructor(private http: HttpClient) { }

  pretragaLjekara(ime: string, prezime: string, ocjena: number, ljekari : Ljekar[]){
    return this.http.post<any>("api/ljekari/pretragaLjekara", { ime: ime, prezime: prezime, ocjena: ocjena, ljekari: ljekari})
  }

  ocijeniLjekara(ocjena: number, ljekar: Ljekar){
    return this.http.post<any>("api/ljekari/ocijeniLjekara/"+ ocjena, ljekar)
  }
}
