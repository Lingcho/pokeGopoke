import { Component } from "@angular/core";
import { element } from 'protractor';
import { ApiService } from "../api.service";


@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})

export class Tab1Page {
  searchPokeByName = '';
  elements = [];
  pokemon = [];
  pokemonSearch= []
   
  constructor(private http: ApiService) {
   
  }

  ngOnInit(){ 
   
    this.loadPokemon()
  }

   loadPokemon() {
    this.http.getPokemons().subscribe(res => {
      
      this.pokemon = res
      
    }) 
  }

  onSearchChange(e) {
   
    let val = e.detail.value;
   console.log(val);
   this.pokemon.forEach(element => {
      
      if (element.frenchName) {
        if (val == element.frenchName.toLowerCase()) {
         this.pokemonSearch = element
         console.log(this.pokemonSearch);
         
          
        }
      } else if (val == element.name) {
        this.pokemonSearch = element
        console.log(element);
        

      }
    });
   
  }
  
  onSearchPokeByName() {
    const search = encodeURIComponent(this.searchPokeByName).trim().toLowerCase()
   
  
  }

  selectVal(value) {

  }

}

