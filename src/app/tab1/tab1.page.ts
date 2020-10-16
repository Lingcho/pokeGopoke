import { Component, ViewChild } from "@angular/core";
import { ApiService } from "../api.service";
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})

export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;
  searchPokeByName = '';
  elements = [];
  pokemon = [];
  pokemonSearch= []
  offset = 0
   
  constructor(private http: ApiService) {}

  ngOnInit(){ 
    this.loadPokemon()
  }

  loadPokemon(loadMore = false, event?) {
    this.http.getPokemons(this.offset).subscribe(res => {
      this.pokemon = res
    })
  //  if (loadMore) {
  //    this.offset += 10
  //  }
  // this.http.getPokemons(this.offset).subscribe(res => {
  //   this.pokemon = [...this.pokemon, ...res]
  //   console.log("range",this.pokemon);
  //   if (event) {
  //     event.target.complete()
  //   }
  // }) 
  }

  onSearchPokeByName(e) {
    let val = e.target.value;
    if (val == '') {
      this.offset = 0;
      this.loadPokemon()
      return
    }
    if (val && val.trim() != '') {
      this.pokemon = this.pokemon.filter((item:any) => {
        if (item.pokeIndex == val) {
          return true
        }
        if (item.frenchName) {
          console.log("indexOk",(item.frenchName.toLowerCase().indexOf(val.toLowerCase()) > -1));
          return (item.frenchName.toLowerCase().indexOf(val.toLowerCase()) > -1)
        } else {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
        }
      })
    }
  }
}

