import { Component } from "@angular/core";
import { ApiService } from "../api.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})

export class Tab2Page {

  data: any;
  dataPokes: any;
  pokedetails:any;
  previouss:boolean;
  pokePlus: any;
  nextButton:boolean;
  
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

  nextPoke(){
    if (this.data["next"]) {
    this.pokePlus = this.data["next"]
    this.getNew(this.pokePlus)
    this.previouss=true 
    } if (this.data.next =="https://pokeapi.co/api/v2/pokemon?offset=1040&limit=10") {
      this.nextButton = true
    }
  } 
   
  previousPoke(){
    if (this.data["previous"]) {
    this.pokePlus = this.data["previous"]
    this.getNew(this.pokePlus)
    this.previouss = true
    this.nextButton = false
    } if (this.data.previous == "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20") {
    this.previouss = false
    }
  }

  displayPoke(){
    const getLastItem = (path) =>
    path.substring(path.lastIndexOf("/") + 1);
    this.dataPokes.forEach((pokemon) => {
      let uri = pokemon.url;
      uri = uri.substring(0, uri.length - 1);
      let idPoke = getLastItem(uri)
      pokemon["id"] = idPoke;
      if (pokemon.id < 10091 ) {
        pokemon[
          "urlImage"
        ] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPoke}.png`;
      }

      if (pokemon.id < 894) {
        pokemon["urlSpecie"] = `https://pokeapi.co/api/v2/pokemon-species/${idPoke}`
        fetch(pokemon.urlSpecie)
        .then(response => response.json())
        .then((data) => {
        if (data.names.length > 0) {
          pokemon["frenchName"] = data.names[4].name
        } else {  
          pokemon["frenchName"] = this.capitalize(data.name)
        } 
        if (data.color == null) {
          pokemon["pokeColor"] = "black"
        } else if (data.color.name == "white"){
            pokemon["pokeColor"] = "grey"
        } else if(data.color.name == "yellow"){
          pokemon["pokeColor"] = "orange"
        } else if(data.color.name == "pink"){
          pokemon["pokeColor"] = "HotPink"
        } else {
          pokemon["pokeColor"] = data.color.name
        }
        });
        } else {
        pokemon["englishName"] = this.capitalize(pokemon.name)
      }
    });
  }
 
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
}
