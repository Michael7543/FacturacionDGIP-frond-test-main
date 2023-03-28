export interface CentroCostoModel {
    listado: CentroCosto[];
  }

export interface CentroCosto {
    idCentroCosto: number;
    codCentroCosto: string;
    nombreCentroCosto: string;
    descCentroCosto: string;
    estadoCentroCosto: string;
    fechaCentroCosto: number;
    idUsuarioCentroCosto: number;
}



