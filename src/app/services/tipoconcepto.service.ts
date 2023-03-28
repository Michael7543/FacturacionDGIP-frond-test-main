import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  TipoConceptoModel } from '../entities/TipoConcepto';

import { map } from 'rxjs/operators';
import { TipoConceptoDTO } from '../Dto/TipoConcepto.dto';

@Injectable({
  providedIn: 'root'
})
export class TipoconceptoService {

  private apiUrl = 'http://172.31.203.232:8080/Concepto/listarConcepto';

  private url = 'http://172.31.203.232:8080/Concepto';

  constructor(private http: HttpClient) { }

  
  getListado(): Observable<TipoConceptoDTO[]> {
    return this.http.get<TipoConceptoModel>('http://172.31.203.232:8080/Concepto/listarConcepto').pipe(
      map(data => data.listado.map(p => new TipoConceptoDTO(p)))
    );
  }

  createTipoConcepto(tipoconcepto: TipoConceptoModel): Observable<any>{
    return this.http.post(`${this.url}/guardarConcepto`, tipoconcepto);
  }

  eliminarTipoConcepto(id: number): Observable<TipoConceptoDTO[]> {
    return this.http.delete<TipoConceptoModel>('http://172.31.203.232:8080/Concepto/eliminaConcepto/' + id ).pipe(
      map(data => data.listado)
    );
  }
}
