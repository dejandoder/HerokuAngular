import { Ljekar } from './Ljekar';
import { Klinika } from './Klinika';
import { TipPregleda } from './TipPregleda';
import { Time } from '@angular/common';
import { Termin } from './Termin';

export class Pregled{
    id : number;
    cijena : number;
    popust : number;
    tipPregleda : TipPregleda=new TipPregleda();
    sala : number;
    trajanje : number;
    termin : Date;
    vrijeme : Date;
    ljekar : Ljekar = new Ljekar();
    medium : string="";
    stanje : string="";
    klinika : Klinika = new Klinika();
    novo : number;
    vrijemepom : Termin = new Termin();
}