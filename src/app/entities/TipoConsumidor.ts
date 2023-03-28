export interface TipoConsumidorModel {
  listado: ListadoModel[];
}

export interface ListadoModel {
  idTipoConsumidor: number;
  nombreTconsumidor: string;
  descTconsumidor: string;
  estadoTconsumidor: string;
  fechaTconsumidor: number;
  idUsuarioTconsumidor: number;
}

