import { Component, OnInit  } from '@angular/core';
import { ApiService } from "../api.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
   sword1 :string = "../../assets/icon/sword1.svg"
   sword2 :string = "../../assets/icon/sword2.svg"
   heart :string = "../../assets/icon/heart.svg"
   shield1 :string = "../../assets/icon/shield2.svg"
   shield2 :string = "../../assets/icon/shield1.svg"
   speed :string = "../../assets/icon/speed.svg"

  pokeDetail = {
    name:'',
    frenchName:'',
    frenchType:'',
    englishType:'',
    attack:'',
    defence:'',
    flavor:[],
    hp:'',
    id:'' ,
    specialAttack:'',
    specialDefence:'',
    speed:'',
    sprite:'',
    urlSpecie:'',
    weight:0
  };
  details:any;
  pokeResult:any;
  idPoke:number;
  previouss:boolean;
  flavorPlus = true ;
  idChange:number

  constructor(private activatedRoute: ActivatedRoute, private http: ApiService) {}
  
  ngOnInit(){ 
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.displayPokedetails(id)
    
  }

  nextPokeDetails(){
    this.flavorPlus = true
    this.previouss = true
    let idPoke = this.details.id
    if (idPoke < 893) {
      idPoke += 1
    } if (idPoke == 893) {
      idPoke += 9108
    } else {
      idPoke += 1
    }
    this.displayPokedetails(idPoke)
  }

  previousPokeDetails(){
    this.flavorPlus = true
    if (this.details.id == 2) {
      this.previouss = false
    }  
    let idPoke = this.details.id
    if (idPoke < 893) {
      idPoke -=1
    } if (idPoke == 10001) {
      idPoke -= 9108
    } else {
      idPoke -=1
    }    this.displayPokedetails(idPoke)
  }
  
  displayPokedetails(id){
    this.http.getPokemonDetails(id).subscribe(result => {
      this.details = result
      this.pokeResult = result

      this.pokeDetail["name"] = this.capitalize(result["name"])
      this.pokeDetail["urlSpecie"] = result["species"]["url"]
      this.pokeDetail["hp"] = result["stats"]["0"]["base_stat"]
      this.pokeDetail["attack"] = result["stats"]["1"]["base_stat"]
      this.pokeDetail["defence"] = result["stats"]["2"]["base_stat"]
      this.pokeDetail["specialAttack"] = result["stats"]["3"]["base_stat"]
      this.pokeDetail["specialDefence"] = result["stats"]["4"]["base_stat"]
      this.pokeDetail["speed"] = result["stats"]["5"]["base_stat"]
      this.pokeDetail["weight"] = Math.round(result["weight"] /2.2046) 
      this.pokeDetail["id"] = result["id"]
      this.pokeDetail["sprite"] = result["sprites"]["front_default"]
    
      if (this.pokeDetail["urlSpecie"]) {
        fetch(this.pokeDetail["urlSpecie"])
        .then(response => (response.json())
        .then((data) => {
          console.log("data",data)
          this.pokeDetail["color"] = data.color.name

          let flavors = this.findValuesHelper(data, "flavor_text_entries")
          let languageFlavor = []
          flavors.forEach(element => {       
          element.forEach(ele => {
            if (ele.language.name == "fr") {
              languageFlavor.push(ele.flavor_text)
              this.pokeDetail["flavor"] = languageFlavor
            } else if (ele.language.name == "en") {
              this.pokeDetail["flavor"] = languageFlavor
            }
          });       
         });

          this.getDetail(data, "names", "fr", "frenchName", "name")
          this.getDetail(data, "genera", "fr", "frenchType", "genus")
          this.getDetail(data, "genera", "en", "englishType", "genus")
        })
        )
      }
    });  
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
 getDetail = (array:any, research:string, lang:string, type:string, propri:any)  => {
  let containeur = this.findValuesHelper(array, research)
          containeur.forEach(element => {    
            element.forEach(ele => {
              if (ele.language.name == lang) {
                this.pokeDetail[type] = ele[propri]
              }
            });
          });
}
  onflavor() {
    
    this.flavorPlus = !this.flavorPlus

}
capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

