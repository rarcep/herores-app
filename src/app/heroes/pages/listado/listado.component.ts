import { Component, OnInit } from '@angular/core';

import { HeroresService } from '../../services/herores.service';

import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(private heroesService: HeroresService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
    .subscribe((resp: Heroe[]) => {
      this.heroes = resp;
    });
  }

}
