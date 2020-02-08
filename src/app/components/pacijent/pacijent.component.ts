import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/AuthService';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit {

  constructor(private router : Router, private route : ActivatedRoute, private serviceOdjava : AuthService) { }

  ngOnInit() {
  }

  profilClick(){
   
      this.router.navigate(["profil"],{relativeTo: this.route});   
    
  }

  klinikaClick(){

    this.router.navigate(["klinika"],{relativeTo: this.route});

  }

  preglediClick(){

    this.router.navigate(["pregledi"],{relativeTo: this.route});

  }

  odjaviClick(){
    this.serviceOdjava.logOutUser();
  }

  zakazaniPregledi(){

    this.router.navigate(["zakazaniPregledi"],{relativeTo: this.route});
    
  }

  zakazivanjeClick(){

    this.router.navigate(["zakazivanje"],{relativeTo: this.route});
    
  }

  istorijaClick(){

    this.router.navigate(["istorija"],{relativeTo: this.route});

  }

  kartonClick(){
    this.router.navigate(["karton"],{relativeTo: this.route});

  }

}
