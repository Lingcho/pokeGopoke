import { Component } from "@angular/core";
import { ApiService } from "../api.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  pokemons;
  urlPokemons = [];
  idPokemons = [];
  urlImages = [];
  constructor(private apiService: ApiService) {}

  ionViewDidEnter() {
    this.apiService.getPokemons().subscribe((data) => {
      this.pokemons = data["results"];

      const getLastItem = (thePath) =>
        thePath.substring(thePath.lastIndexOf("/") + 1);
      this.pokemons.forEach((pokemon) => {
        let uri = pokemon.url;
        uri = uri.substring(0, uri.length - 1);

        console.log(this.pokemons);
        pokemon["id"] = getLastItem(uri);
        pokemon[
          "urlImage"
        ] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getLastItem(
          uri
        )}.png`;
      });
    });

    console.log("en haut >>>>>", this.urlPokemons);

    console.log("en bas >>>>>", this.idPokemons);
  }
}
