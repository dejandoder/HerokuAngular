import { Pregled } from './Pregled';
import { Termin } from './Termin';

export class Ljekar{
    id : number;
    ime : string = "";
    prezime : string = "";
    ocjena : number;
    pregledi : Pregled[]=[];
    radno_vrijeme_od: Date;
    radno_vrijeme_do: Date;
    godisnji_od: Date;
    godisnji_do: Date;
    termini : Termin[]=[];
}