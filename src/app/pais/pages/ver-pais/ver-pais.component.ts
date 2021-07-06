import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!:Country; // pais puede ser nulo->!

  // activatedRoute suscribirse a cualquier cambio de url
  constructor(
    private activatedRoute:ActivatedRoute,
    private paisService:PaisService
  ) { }

  ngOnInit(): void {
    // using switchMap
    this.activatedRoute.params
      .pipe(
        switchMap((param) => this.paisService.getPaisPorAlpha(param.id) ), // recibe el valor del observable amterior y retorna el observable de getPaisPorAlpha
        tap(console.log) // imprimir en consola lo que recibe del observable anterior
      )
      .subscribe(resp => {
        console.log(resp);
        this.pais = resp;
      });

    // this.activatedRoute.params
    //   //.subscribe( params => { // mejor desestructuro params para que solo tome id
    //   .subscribe( ({id}) => {
    //     console.log( id );
    //     this.paisService.getPaisPorAlpha(id)
    //       .subscribe( pais => {
    //         console.log(pais);
    //       });
    //   });
  }

}
