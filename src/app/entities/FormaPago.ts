

export interface FormaPagoModel {
    listado: ListadoFPago[];
  }
  
  export interface ListadoFPago {
    idFormaPago:   number;
    nombreFp:      string;
    codigoSri:     string;
    activo:        string;
    codigoSae:     string;
    descripcionFp: string;
    fechaFp:       number;
    idUsuarioFp:   number;
  }