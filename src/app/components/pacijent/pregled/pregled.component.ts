import { Component, OnInit } from '@angular/core';
import { Pregled } from 'src/app/model/Pregled';
import { PregledService } from 'src/app/service/pregled.service';
import { DatePipe } from '@angular/common';
import { error } from 'util';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pregled',
  templateUrl: './pregled.component.html',
  styleUrls: ['./pregled.component.css']
})
export class PregledComponent implements OnInit {

  pregledi: Pregled[] = [];
  danasnjiDatum = new Date;
  num : Date;

  constructor(private service: PregledService, private datePipe: DatePipe, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.preuzmiDostupnePreglede().subscribe(
      data => {
        this.pregledi = data;
        for (let date of this.pregledi) {
          date.medium = this.datePipe.transform(date.termin, "MMM d, y");
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  transformDate(date) {
    this.datePipe.transform(date, 'yyyy-MM-dd'); //whatever format you need. 
  }

  zakaziDostupniPregled(pregled: Pregled) {
    this.toastr.info("Molimo sacekajte, u toku je zakazivanje pregleda");
    this.service.zakaziDostupniPregled(pregled).subscribe(
      data => {
        this.toastr.warning("Pregled je moguce otkazati najkasnije 24h prije pocetka!", "Upozorenje!", {
          timeOut: 6000
        });
        this.toastr.success("Uspjesno ste zakazali pregled");

        this.service.preuzmiDostupnePreglede().subscribe(
          data => {
            this.pregledi = data;
            for (let date of this.pregledi) {
              date.medium = this.datePipe.transform(date.termin, "MMM d, y");
            }
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
