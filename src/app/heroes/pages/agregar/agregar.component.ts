import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { switchMap} from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroresService } from '../../services/herores.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  heroe: Heroe = {
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    superhero: '',
    alt_img: ''
  };
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  constructor(
    private heroesService: HeroresService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    if(!this.router.url.includes('editar')){
      return;
    }
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroesService.getHeroe(id))
    )
    .subscribe(heroe => this.heroe = heroe);
  }

  guardar() {
    if(this.heroe.superhero.trim().length === 0){
      return;
    }
    if(this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(resp => {
        console.log('Actualizando... ', resp);
        this.mostrarSnakBar('Heroe actualizado..');
      });
    } else {
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnakBar('Heroe creado..');
      });
    }
  }
  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '350px',
      data: this.heroe
    });
    dialog.afterClosed().subscribe(result => {
      if(result) {
        this.heroesService.borrarHeroe(this.heroe.id!)
            .subscribe( resp => {
              this.router.navigate(['/heroes']);
            });
      }
    });
  }

  mostrarSnakBar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }

}
