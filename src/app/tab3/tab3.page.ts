import { Component, OnInit  } from '@angular/core';
import { ApiService } from "../api.service";
import { ActivatedRoute } from '@angular/router';
let Pokedex = require('pokedex-promise-v2')
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
   sword1 :string = "../../assets/icon/sword1.svg"
   sword2 :string = "../../assets/icon/sword2.svg"
   heart :string = "../../assets/icon/heart.svg"
   shield1 :string = "../../assets/icon/shield1.svg"
   shield2 :string = "../../assets/icon/shield2.svg"
   speed :string = "../../assets/icon/speed.svg"

  options = {
   protocol: 'https',
   hostName: 'pokeapi.co',
   versionPath: '/api/v2/',
   cacheLimit: 100 * 1000, // 100s
   timeout: 5 * 1000 // 5s
 }
 P = new Pokedex(this.options)
 
  details:any;
  poke:any;
  idPoke:any;

  constructor(private activatedRoute: ActivatedRoute, private http: ApiService) {}
  
  ngOnInit(){ 
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.idPoke = id
    this.displayPokedetails(id)
   
  }

  displayPokedetails(id){
    this.http.getPokemonDetails(id).subscribe(result => {
      this.details = result
      console.log("pokess",this.details)
    });
    
    this.P.getPokemonByName(id) // with Promise
    .then((response) => {
     
     this.poke = response
    
    })
  }

  nextPokedetails() {
    let counterId =+ this.idPoke
    this.displayPokedetails(counterId)
    
  }

  getDeepArray() {

  }
  
  

}


