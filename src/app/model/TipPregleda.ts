import { Ljekar } from './Ljekar';
import { Klinika } from './Klinika';

export class TipPregleda{
    id : number;
    ime: string="";
    cijena : number;
    ljekari : Ljekar[] =[];
    klinike : Klinika[] =[];
}