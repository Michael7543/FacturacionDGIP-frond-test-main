export class TipoConceptoDTO {
    idTipoConcepto:     number;
    nombreTipoConcepto: string;
    descTipoConcepto:   string;
    idUnidadTc:         number;
    prtidaNc:           number;
    fechaTc:           number;
    idUsuarioTc:        number;

    constructor (data:TipoConceptoDTO) {
        this.idTipoConcepto = data.idTipoConcepto;
        this.nombreTipoConcepto = data.nombreTipoConcepto;
        this.descTipoConcepto= data.descTipoConcepto;
        this.idUnidadTc = data.idUnidadTc;
        this.prtidaNc= data.prtidaNc;
        this.fechaTc = data.fechaTc;
        this.idUsuarioTc = data.idUsuarioTc;

    }
}