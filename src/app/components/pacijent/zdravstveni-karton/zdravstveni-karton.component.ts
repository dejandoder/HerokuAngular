import { Component, OnInit } from '@angular/core';
import { PregledService } from 'src/app/service/pregled.service';
import { DatePipe } from '@angular/common';
import { Pregled } from 'src/app/model/Pregled';

@Component({
  selector: 'app-zdravstveni-karton',
  templateUrl: './zdravstveni-karton.component.html',
  styleUrls: ['./zdravstveni-karton.component.css']
})
export class ZdravstveniKartonComponent implements OnInit {

  pregledi: Pregled[]=[]

  constructor(private service: PregledService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.service.preuzmiZakazanePreglede().subscribe(
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

}
