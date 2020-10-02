import { Component } from "@angular/core";
import { ApiService } from "../api.service";
let Pokedex = require('pokedex-promise-v2')

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})

export class Tab2Page {
  
P = new Pokedex

  pokemons;
  urlPokemons = [];
  idPokemons = [];
  urlImages = [];
  constructor(private apiService: ApiService) {}

  ionViewDidEnter() {

    this.P.getBerryByName('cheri')
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
 

    this.apiService.getPokemons().subscribe((data) => {
      this.pokemons = data["results"];

      const getLastItem = (thePath) =>
        thePath.substring(thePath.lastIndexOf("/") + 1);
      this.pokemons.forEach((pokemon) => {
        let uri = pokemon.url;
        uri = uri.substring(0, uri.length - 1);

        pokemon["id"] = getLastItem(uri);
        pokemon[
          "urlImage"
        ] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getLastItem(
          uri
        )}.png`;

      });
      console.log(this.pokemons[1].id)
    });

   
    
    
  }
}
