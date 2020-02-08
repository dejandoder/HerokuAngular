import { Component, OnInit, ViewChild, Directive, Input, Output, EventEmitter, ViewChildren, QueryList, HostListener } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { Korisnik } from 'src/app/model/Korisnik';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/model/Student';
import { Klinika } from 'src/app/model/Klinika';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { KlinikaService } from 'src/app/service/klinika.service';
import { Subscription } from 'rxjs';
import { SortService } from 'src/app/service/sort.service';


@Component({
  selector: 'app-klinika',
  templateUrl: './klinika.component.html',
  styleUrls: ['./klinika.component.css']
})

export class KlinikaComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  studenti: Student[] = [];
  student: Student = new Student();
  klinike: Klinika[] = [];

  sortedData;

 
  constructor(private service: StudentService, private serviceKlinika: KlinikaService, private sortService: SortService) { 
    this.sortedData = this.klinike.slice();
  }

  //displayedColumns: string[] = ['ime'];
  //dataSource = new MatTableDataSource(this.klinike);

  ngOnInit() {

    this.serviceKlinika.preuzmiSveKlinike().subscribe(
      data => {
        this.klinike = data;
        this.sortedData=this.klinike;
      },
      error => {
        console.log(error);
      }
    )


  }

  sortData(sort: Sort) {
    const data = this.klinike.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'ime': return compareString(a.ime, b.ime, isAsc);
        case 'adresa': return compareString(a.adresa, b.adresa, isAsc);
        case 'opis': return compareString(a.opis, b.opis, isAsc);
        case 'grad': return compareString(a.grad, b.grad, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number, b: number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareString(a: string, b: string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

