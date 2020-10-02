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
        
        console.log(data.names[4].name)
        pokemon["frenchName"] = data.names[4].name
        pokemon["pokeColor"] = data.color.name
        });
   
      });
     })
   }

   getNew(url) {
    fetch(url)
    .then(response => response.json())
    .then((res) => {
      console.log(res)
      this.data = res
      this.dataPokes = res.results
     });
   }
   pokePlus: any;
   nextPoke(){
     this.pokePlus = this.data["next"]
    this.getNew(this.pokePlus)
    console.log(this.pokePlus)
   
   }
   previousPoke(){
    this.pokePlus = this.data["previous"]
   this.getNew(this.pokePlus)
   console.log(this.pokePlus)
  
  }
}

