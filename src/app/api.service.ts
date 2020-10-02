import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  
  offset = 0;

  constructor(private httpClient: HttpClient) {}

  getPokemons() {
    return this.httpClient.get("https://pokeapi.co/api/v2/pokemon");
  }

  getPokemonsNext() {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=20`)
  }

}


