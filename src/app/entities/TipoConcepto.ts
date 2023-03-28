
export interface TipoConceptoModel {
    listado: TipoConcepto[];
  }

export interface TipoConcepto {
    
    idTipoConcepto:     number;
    nombreTipoConcepto: string;
    descTipoConcepto:   string;
    idUnidadTc:         number;
    prtidaNc:           number;
    fechaTc:           number;
    idUsuarioTc:        number;

}


