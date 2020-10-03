import { Component  } from '@angular/core';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  data: any;
  dataPokes: any;
  
  constructor(private http: ApiService) {}

  ngOnInit(){ 
    this.getDataUser();
   
  }

   getDataUser() {
     this.http.getData()
     .subscribe(res =>{
       this.data = res
       this.dataPokes = res.results

      this.displayPoke()
     })
   }

   getNew(url) {
    fetch(url)
    .then(response => response.json())
    .then((res) => {
      
      this.data = res
      this.dataPokes = res.results
      this.displayPoke()
   
     });
   }
   previouss:boolean;
   pokePlus: any;
   nextPoke(){
     this.pokePlus = this.data["next"]
    this.getNew(this.pokePlus)
   
    this.previouss=true
   }

   
   previousPoke(){
     
     if (this.data["previous"]) {
      this.pokePlus = this.data["previous"]
      this.getNew(this.pokePlus)
      
      this.previouss = true
      console.log("precedent", this.previouss)
      console.log(this.data.previous)
     } if (this.data.previous == "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20") {
      this.previouss = false
      console.log("audebut", this.previouss)
      
     }
   
    
  }

  displayPoke(){
    const getLastItem = (thePath) =>
    thePath.substring(thePath.lastIndexOf("/") + 1);

    this.dataPokes.forEach((pokemon) => {
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
    pokemon["frenchName"] = data.names[4].name
    pokemon["pokeColor"] = data.color.name
    });

});
  }
}

