import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Heroe } from '../interfaces/heroe.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroresService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }
  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`);
  }
  getHeroe(heroeId: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${heroeId}`);
  }
  agregarHeroe(heroe: Heroe):Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }
  actualizarHeroe(heroe: Heroe):Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }
  borrarHeroe(heroeId: string):Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/heroes/${heroeId}`);
  }
}
