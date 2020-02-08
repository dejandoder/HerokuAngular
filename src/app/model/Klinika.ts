import { Ljekar } from './Ljekar';
import { Pregled } from './Pregled';

export class Klinika{
    id : number;
    ime : string = "";
    adresa : string = "";
    opis : string = "";
    ljekari : Ljekar[]=[];
    pregledi : Pregled[]=[];
    grad: string="";
    ocjena: number;
}