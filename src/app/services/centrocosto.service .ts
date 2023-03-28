import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CentroCostoModel} from '../entities/CentroCosto';
import {CentroCostoDto} from '../Dto/CentroCosto.dto'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CentroCostoService {
  private apiUrl = 'http://172.31.203.232:8080/centrocosto/listarCentroCosto';
  private api= 'http://172.31.203.232:8080/centrocosto'

  constructor(private http: HttpClient) { }

  
   getCentroCosto(): Observable<CentroCostoDto[]> {
     return this.http.get<CentroCostoModel>('http://172.31.203.232:8080/centrocosto/listarCentroCosto').pipe(
      map(data => data.listado.map(p => new CentroCostoDto(p)))
     );
   }

   createCentroCosto(createCentroCosto: CentroCostoModel): Observable<any>{
    return this.http.post(`${this.api}/guardarCentroCosto`, createCentroCosto);
  }

  eliminarCentroCosto(id: number): Observable<CentroCostoDto[]> {
    return this.http.delete<CentroCostoModel>('http://172.31.203.232:8080/centrocosto/eliminarCentroCosto/' + id ).pipe(
      map(data => data.listado)
    );
  }
}
