export class TarjetaDTO {
    idTarjeta: string;
    nombreTarjeta: string;
    descTarjeta: string;
    stateTarjeta: string;
    dateTarjeta: string;
    idUsurTarjeta: string;

    constructor(data: TarjetaDTO) {
        this.idTarjeta = data.idTarjeta;
        this.nombreTarjeta = data.nombreTarjeta;
        this.descTarjeta = data.descTarjeta;
        this.stateTarjeta = data.stateTarjeta;
        this.dateTarjeta = data.dateTarjeta;
        this.idUsurTarjeta = data.idUsurTarjeta;
    }
}

