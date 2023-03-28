export class FormaPagoDTO {
    idFormaPago: number;
    nombreFp: string;
    codigoSri: string;
    activo: string;
    codigoSae: string;
    descripcionFp: string;
    fechaFp: number;
    idUsuarioFp: number;

    constructor(data: FormaPagoDTO) {
        this.idFormaPago = data.idFormaPago;
        this.nombreFp = data.nombreFp;
        this.codigoSri = data.codigoSri;
        this.activo = data.activo;
        this.codigoSae = data.codigoSae;
        this.descripcionFp = data.descripcionFp;
        this.fechaFp = data.fechaFp;
        this.idUsuarioFp = data.idUsuarioFp;
    }
}