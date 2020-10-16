import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: "root",
})

export class ApiService {
  apiUrl = "https://pokeapi.co/api/v2/pokemon"
  apiUrlId = 'https://pokeapi.co/api/v2/pokemon'
  imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
  urlSpecie = "https://pokeapi.co/api/v2/pokemon-species/"
  offset = 0
  constructor(private http: HttpClient) {}


  getPokemonDetails(id) : Observable<any>{
    
    return this.http.get(`${this.apiUrlId}/${id}`).pipe(
      map(this.extractData)
    );
  }


  extractData(res: Response) {
    return res 
  }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map(this.extractData)
    )
  }

  getPokemons(offset) {
    
    return this.http.get(`${this.apiUrl}/?offset=${this.offset}&limit=1050`)
    .pipe(map(result => {
      return result['results']
    }),
    map(pokemons => {
      
     return pokemons.map((poke, index) => {
       let id = index + 1
       if (id < 10091) {
         poke.image = this.getPokemonImage(id)
         poke.pokeIndex = id
       }

       if (id < 894) {
         poke.pokeUrlSpicie = `${this.urlSpecie}${id}`
         fetch(poke.pokeUrlSpicie)
         .then(response => (response.json())
         .then((data) => {
  
           let containeur = this.findValuesHelper(data, "names")
           containeur.forEach(element => {    
             element.forEach(ele => {
               if (ele.language.name == "fr") {
                 poke.frenchName = ele.name
               }
             });
           });
       
         
           return data
         }),
       
         )
       }
     
      return poke

      })
    }),
    
    )
  }
 
  getPokemonImage(index) {
    return `${this.imageUrl}${index}.png`
  }

  findValuesHelper(obj, key) {
    
    let list = [ ];
    if (!obj) return list;
    if (obj instanceof Array) {
        for (var i in obj) {
            list = list.concat(this.findValuesHelper(obj[i], key));
        }
        return list;
    }
    if (obj[key]) list.push(obj[key]);

    if ((typeof obj == "object") && (obj !== null)) {
        let children = Object.keys(obj);
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                list = list.concat(this.findValuesHelper(obj[children[i]], key));
            }
        }
    }
    return list;
  }
  
}


