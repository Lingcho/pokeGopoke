import { Component  } from '@angular/core';
import { ApiService } from "../api.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
 detail= null;
  
  constructor(private activatedRoute: ActivatedRoute, private http: ApiService) {}

  ngOnInit(){ 
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(id)
   this.http.getPokemonDetails(id).subscribe(result => {
    this.detail = result
    console.log(result)
   })
   
  }

}

