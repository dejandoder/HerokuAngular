import { Component, OnInit, TemplateRef } from '@angular/core';
import { PregledService } from 'src/app/service/pregled.service';
import { DatePipe } from '@angular/common';
import { Pregled } from 'src/app/model/Pregled';
import { Sort } from '@angular/material';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Klinika } from 'src/app/model/Klinika';
import { KlinikaService } from 'src/app/service/klinika.service';
import { Ljekar } from 'src/app/model/Ljekar';
import { LjekarService } from 'src/app/service/ljekar.service';

@Component({
  selector: 'app-istorija',
  templateUrl: './istorija.component.html',
  styleUrls: ['./istorija.component.css']
})
export class IstorijaComponent implements OnInit {

  pregledi: Pregled[] = [];
  sortedData;
  novo : number;
  modalRef: BsModalRef;
  imeKlinike : string="";
  adresaKlinike : string="";
  gradKlinike : string="";
  ocjenaKlinike : number;
  imeLjekara : string="";
  prezimeLjekara : string="";
  ocjenaLjekara : number;
  ocjenjenaKlinika : any;
  klinikaZaOcjenu: Klinika =  new Klinika;
  ljekarZaOcjenu: Ljekar = new Ljekar;
  ocjenjenLjekar : any;

  constructor(private service: PregledService, private datePipe: DatePipe, private modalService: BsModalService, private klinikaService : KlinikaService, private ljekarService : LjekarService) { 
    this.sortedData = this.pregledi.slice();
  }

  ngOnInit() {
    this.service.preuzmiIstoriju().subscribe(
      data => {
        this.pregledi = data;
        
        for (let date of this.pregledi) {
          date.medium = this.datePipe.transform(date.termin, "d MMM y, h:mm a");
        }
        this.sortedData=this.pregledi;
      },
      error => {
        console.log(error);
      }
    )
  }

  transformDate(date) {
    this.datePipe.transform(date, 'yyyy-MM-dd'); //whatever format you need. 
  }

  sortData(sort: Sort) {
    const data = this.pregledi.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'cijena': return compare(a.cijena, b.cijena, isAsc);
        case 'popust': return compare(+a.popust, +b.popust, isAsc);
        case 'tip': return compareString(a.tipPregleda.ime, b.tipPregleda.ime, isAsc);
        case 'sala': return compare(+a.sala, +b.sala, isAsc);
        case 'trajanje': return compare(+a.trajanje, +b.trajanje, isAsc);
        case 'stanje': return compareString(a.stanje, b.stanje, isAsc);
        case 'ljekar': return compareString(a.ljekar.ime, b.ljekar.ime, isAsc);
        case 'klinika': return compareString(a.klinika.ime, b.klinika.ime, isAsc);
        case 'medium': return compareDate(a.termin, b.termin, isAsc);
        default: return 0;
      }
    });
  }

  ocijeniKliniku(template: TemplateRef<any>, pregled: Pregled) {
    this.klinikaZaOcjenu= pregled.klinika;
    this.modalRef = this.modalService.show(template);
    this.imeKlinike=pregled.klinika.ime;
    this.adresaKlinike=pregled.klinika.adresa;
    this.gradKlinike=pregled.klinika.grad;
    this.ocjenaKlinike=pregled.klinika.ocjena;
  }

  ocijeniLjekara(template: TemplateRef<any>, pregled: Pregled) {
    this.ljekarZaOcjenu= pregled.ljekar;
    this.modalRef = this.modalService.show(template);
    this.imeLjekara=pregled.ljekar.ime;
    this.prezimeLjekara=pregled.ljekar.prezime;
    this.ocjenaLjekara=pregled.ljekar.ocjena;
  }

  ocijeniK(){
    this.modalRef.hide();

    this.klinikaService.ocijeniKliniku(this.ocjenjenaKlinika, this.klinikaZaOcjenu).subscribe(
      data => {
        this.service.preuzmiIstoriju().subscribe(
          data => {
            this.pregledi = data;
            
            for (let date of this.pregledi) {
              date.medium = this.datePipe.transform(date.termin, "d MMM y, h:mm a");
            }
            this.sortedData=this.pregledi;
          },
          error => {
            console.log(error);
          }
        )
      },
      error => {
        console.log(error);
      }
    )

    
  }

  ocijeniLj(){
    this.modalRef.hide();

    this.ljekarService.ocijeniLjekara(this.ocjenjenLjekar, this.ljekarZaOcjenu).subscribe(
      data => {
        this.service.preuzmiIstoriju().subscribe(
          data => {
            this.pregledi = data;
            
            for (let date of this.pregledi) {
              date.medium = this.datePipe.transform(date.termin, "d MMM y, h:mm a");
            }
            this.sortedData=this.pregledi;
          },
          error => {
            console.log(error);
          }
        )
      },
      error => {
        console.log(error);
      }
    )

    

  }

}

function compare(a: number, b: number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareString(a: string, b: string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareDate(a: Date, b: Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

