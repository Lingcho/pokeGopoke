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
   
  constructor(private http: ApiService) {
   
  }

  ngOnInit(){ 
   
    this.loadPokemon()
  }

   loadPokemon(loadMore = false, event?) {
     if (loadMore) {
       this.offset += 10
     }
    this.http.getPokemons(this.offset).subscribe(res => {
      this.pokemon = [...this.pokemon, ...res]
      console.log("range",this.pokemon);
      if (event) {
        event.target.complete()
      }
    }) 
  }

  onSearchChange(e) {
    let val = e.detail.value;
   console.log(val);
  
   this.pokemon.forEach(element => {
      
      if (element.frenchName) {
        if (val == element.frenchName.toLowerCase()) {
         this.pokemon = element
         console.log(this.pokemon);
         
          
        }
      } else if (val == element.name) {
        this.pokemon = element
        console.log(element);
        

      }
    });
   
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
  //  this.pokemon.forEach(element => {
      
  //     if (element.frenchName) {
  //       if (val == element.frenchName.toLowerCase()) {
  //        this.pokemonSearch = element
  //        console.log(this.pokemonSearch);
         
          
  //       }
  //     } else if (val == element.name) {
  //       this.pokemonSearch = element
  //       console.log(element);
        

  //     }
  //   });
   
   
  
  }

  selectVal(value) {

  }

}

