import { Ljekar } from './Ljekar';
import { Time } from '@angular/common';

export class Termin{
    id : number;
    termin : Date;
    ljekar : Ljekar = new Ljekar();
    zauzet : boolean;
}