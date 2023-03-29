import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TarjetaDTO } from '../Dto/Tarjeta.dto';
import { TarjetaModel } from '../entities/tarjeta';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TarjetaHttpServiceService {

  private url = 'http://172.31.203.232:8080/Tarjeta';

  constructor(private http: HttpClient) { }

  
  getTarjeta(): Observable<TarjetaDTO[]> {
    return this.http.get<TarjetaModel>('http://172.31.203.232:8080/Tarjeta/listTarjeta').pipe(
      map(data => data.listado.map(p => new TarjetaDTO(p)))
    );
  }

  createTarjeta(tarjeta: TarjetaModel): Observable<any>{
    return this.http.post(`${this.url}/gTarjeta`, tarjeta);
  }

  eliminarTarjeta(id: number): Observable<TarjetaDTO[]> {
    return this.http.delete<TarjetaModel>('http://172.31.203.232:8080/Tarjeta/deleteTarjeta/' + id ).pipe(
      map(data => data.listado)
    );
  }
}
