export class ListadoDTO {
    idTipoConsumidor: number;
    nombreTconsumidor: string;
    descTconsumidor: string;
    estadoTconsumidor: string;
    fechaTconsumidor: number;
    idUsuarioTconsumidor: number;

    constructor(data: ListadoDTO) {
        this.idTipoConsumidor = data.idTipoConsumidor;
        this.nombreTconsumidor = data.nombreTconsumidor;
        this.descTconsumidor = data.descTconsumidor;
        this.estadoTconsumidor = data.estadoTconsumidor;
        this.fechaTconsumidor = data.fechaTconsumidor;
        this.idUsuarioTconsumidor = data.idUsuarioTconsumidor;
    }
}
