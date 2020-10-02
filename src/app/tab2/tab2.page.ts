import { Component } from "@angular/core";
import { ApiService } from "../api.service";
let Pokedex = require('pokedex-promise-v2')

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})

export class Tab2Page {
  
  options = {
    protocol: 'https',
    hostName: 'pokeapi.co',
    versionPath: '/api/v2/',
    cacheLimit: 100 * 1000, // 100s
    timeout: 5 * 1000 // 5s
  }
  
P = new Pokedex(this.options)

  pokemons: any;
  pokemonSpecies: any;
  
  
  constructor(private apiService: ApiService) {}

  ionViewDidEnter() {

    this.P.getPokemonByName([1,2,3]) // with Promise
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });


    // Appel API via service 
    this.apiService.getPokemons().subscribe((data) => {
      this.pokemons = data["results"];

      const getLastItem = (thePath) =>
        thePath.substring(thePath.lastIndexOf("/") + 1);
      this.pokemons.forEach((pokemon) => {
        let uri = pokemon.url;
        uri = uri.substring(0, uri.length - 1);
        let idPoke = getLastItem(uri)
        pokemon["id"] = idPoke;
        pokemon[
          "urlImage"
        ] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPoke}.png`;

        pokemon["urlSpecie"] = `https://pokeapi.co/api/v2/pokemon-species/${idPoke}`
        
        
        fetch(pokemon.urlSpecie)
      .then(response => response.json())
      .then((data) => {
      
       console.log(data.names[4].name)
       pokemon["frenchName"] = data.names[4].name
      });
   
      });
     
      
      
      console.log(this.pokemons)
    });

   
    
    
  }
}
