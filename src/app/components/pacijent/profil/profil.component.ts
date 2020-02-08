import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KorisnikService } from 'src/app/service/korisnik.service';
import { Korisnik } from 'src/app/model/Korisnik';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  trenutniKorisnik: Korisnik=new Korisnik();
  modalRef: BsModalRef;
  ime : string = ""; 
  prezime : string = "";
  email : string = "";
  grad : string = "";
  novaLozinka : any;

  constructor(private router : Router, private route : ActivatedRoute, private service: KorisnikService, private toastr: ToastrService, private modalService: BsModalService) { }

  ngOnInit() {
    this.service.vratiTrenutnogKorisnika().subscribe(
      data =>{
        this.trenutniKorisnik=data;
      },
      error => {
        console.log(error);
      }
    )
  }

  odustani(){
    this.router.navigate(["pocetnaPacijent"],{relativeTo: this.route}); 
  }

  izmijeniPodatke(){
    this.service.izmjenaPodataka(this.trenutniKorisnik).subscribe(
      data => {
        this.toastr.success("Uspjesno ste promijenili podatke!", this.trenutniKorisnik.ime);
      },
      error => {
  
      }
    );
  }

  izmijeniLozinku(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }
  izmijeniLozinku2(){
    this.service.izmjenaLozinke(this.novaLozinka).subscribe(
      data => {
        this.toastr.success("Uspjesno ste promijenili lozinku!");
      },
      error => {
        this.toastr.success("Uspjesno ste promijenili lozinkurac!");
      }
    )
    this.modalRef.hide();
  }

  odustaniOdIzmjene(){
     this.modalRef.hide();
  }

}
