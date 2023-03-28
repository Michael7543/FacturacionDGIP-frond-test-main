export interface TarjetaModel {
    listado: Tarjeta[];
  }

export interface Tarjeta {
  idTarjeta: string;
  nombreTarjeta: string;
  descTarjeta: string;
  stateTarjeta: string;
  dateTarjeta: string;
  idUsurTarjeta: string;
}

