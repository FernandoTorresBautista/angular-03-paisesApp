import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor:pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino:string="";
  hayError:boolean=false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  buscarSugerencia: boolean = false;

  constructor(
    private paisService: PaisService
  ) { }

  buscar( termino:string ) {
    this.hayError = false;
    this.termino = termino;
    
    this.paisService.buscarPais(this.termino) // debe tener el subscribe para que se dispare
      .subscribe( (paises) => {
        console.log(paises);
        this.paises = paises;
        // resp[0].languages[0]. 
      }, (err) => {
        this.hayError = true;
        this.paises = [];
      }); 
    
  }

  sugerencias(termino:string){
    this.hayError = false;
    this.termino = termino;
    this.buscarSugerencia = true;

    this.paisService.buscarPais(termino) 
      .subscribe( 
        paises => this.paisesSugeridos = paises.slice(0,5),
        (err) => this.paisesSugeridos = []
      );
  }

  buscarSugerido(termino:string){
    this.buscar(termino);
    this.buscarSugerencia=false;
  }
}
