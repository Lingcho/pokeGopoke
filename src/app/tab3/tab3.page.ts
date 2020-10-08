import { Component, OnInit  } from '@angular/core';
import { ApiService } from "../api.service";
import { ActivatedRoute } from '@angular/router';
let Pokedex = require('pokedex-promise-v2')
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
   sword1 :string = "../../assets/icon/sword1.svg"
   sword2 :string = "../../assets/icon/sword2.svg"
   heart :string = "../../assets/icon/heart.svg"
   shield1 :string = "../../assets/icon/shield1.svg"
   shield2 :string = "../../assets/icon/shield2.svg"
   speed :string = "../../assets/icon/speed.svg"

  options = {
   protocol: 'https',
   hostName: 'pokeapi.co',
   versionPath: '/api/v2/',
   cacheLimit: 100 * 1000, // 100s
   timeout: 5 * 1000 // 5s
 }
 P = new Pokedex(this.options)
 
  details:any;
  poke:any;
  idPoke:number;
  flavor:any;
  previouss:boolean;
  flavorPlus = true ;
  constructor(private activatedRoute: ActivatedRoute, private http: ApiService) {}
  
  ngOnInit(){ 
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.displayPokedetails(id
      )
   
  }

  nextPokeDetails(){
    this.previouss = true
    let idPoke = this.details.id
    idPoke +=1
    console.log(idPoke)
    this.displayPokedetails(idPoke)
  }

  previousPokeDetails(){
    if (this.details.id == 2) {
      this.previouss = false
      console.log(this.previouss)
    }
      
      
    let idPoke = this.details.id
    
    idPoke -=1
    console.log(idPoke)
    this.displayPokedetails(idPoke)
    
    
  }
  
  displayPokedetails(id){
  
    
    this.http.getPokemonDetails(id).subscribe(result => {
      this.details = result
      console.log("details =>>",this.details)
      let frName = this.findValuesHelper(this.details, "names")
        
    

  
     let flavors = this.findValuesHelper(this.details, "flavor_text_entries")
      let frenchFlavor = []
     flavors.forEach(element => {
       
      element.forEach(ele => {
        if (ele.language.name == "fr") {
          frenchFlavor.push(ele.flavor_text)
          this.flavor = frenchFlavor
        } 
      });
      
     });
    });
    
    this.P.getPokemonByName(id) // with Promise
    .then((response) => {
     
     this.poke = response
     this.poke["urlSpecie"] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
     console.log("poke:=)",this.poke)
    
    })
    
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

  onflavor() {
    
    this.flavorPlus = !this.flavorPlus

}
}

