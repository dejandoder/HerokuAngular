import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pocetna-stranica',
  templateUrl: './pocetna-stranica.component.html',
  styleUrls: ['./pocetna-stranica.component.css']
})
export class PocetnaStranicaComponent implements OnInit {

  constructor(private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
  }

  prijavaClick() {
    this.router.navigate(["login"]);   
  }
  
  registracijaClick() {
    this.router.navigate(["registracija"]);   
  }


}
