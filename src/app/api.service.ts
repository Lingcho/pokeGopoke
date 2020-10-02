import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})

export class ApiService {
   apiUrl = "https://pokeapi.co/api/v2/pokemon"
  offset = 0;
  
  constructor(private http: HttpClient) {}

  getPokemons() {
    return this.http.get("https://pokeapi.co/api/v2/pokemon");
  }

  getPokemonsNext() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=20`)
  }

  getPokemonsDetails(id){
    return this.http.get('https://pokeapi.co/api/v2/pokemon-species/${id}/');
  }


  extractData(res: Response) {
    return res 
  }
  getData(): Observable<any> {
return this.http.get(this.apiUrl).pipe(
  map(this.extractData)
)
  }
}


