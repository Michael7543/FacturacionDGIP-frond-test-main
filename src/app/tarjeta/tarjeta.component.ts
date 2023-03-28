import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Tarjeta, TarjetaModel } from '../entities/tarjeta';
import { TarjetaHttpServiceService } from '../services/tarjeta-http-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaDTO } from '../Dto/Tarjeta.dto';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { TipoConsumidorModel } from '../entities/TipoConsumidor';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css'],
})
export class TarjetaComponent implements OnInit {

  TarjetaForm: FormGroup;
  listadotarjeta: TarjetaDTO[] = []; //poner

  constructor(private TarjetaHttpServiceService: TarjetaHttpServiceService, private form: FormBuilder,) {
    {
      this.TarjetaForm = this.form.group({
        nombreTarjeta: ['', Validators.required],
        descTarjeta: ['', Validators.required],
        stateTarjeta: ['', Validators.required],
        dateTarjeta: ['', Validators.required],
        idUsurTarjeta: ['', Validators.required],

      })
    }

  }

  ngOnInit(): void {
    this.getTarjeta();
  }

  getTarjeta() {
    this.TarjetaHttpServiceService.getTarjeta().subscribe(data => {
      this.listadotarjeta = data;
    });
  }

/*   agregarTarjeta() {
    const list: any = {
      nombreTarjeta: this.TarjetaForm.get('nombreTarjeta')?.value,
      descTarjeta: this.TarjetaForm.get('descTarjeta')?.value,
      stateTarjeta: this.TarjetaForm.get('stateTarjeta')?.value,
      dateTarjeta: this.TarjetaForm.get('dateTarjeta')?.value,
      idUsurTarjeta: this.TarjetaForm.get('idUsurTarjeta')?.value,
      idTarjeta: 0
    }
    this.TarjetaHttpServiceService.createTarjeta(list).subscribe(data => {
      this.getTarjeta()
    })
  } */

  agregarTarjeta() {
    let Tarjeta: TarjetaModel = this.TarjetaForm.value;

    this.TarjetaHttpServiceService
      .createTarjeta(Tarjeta)
      .subscribe((data) => {
        this.getTarjeta();
      });
  }





  eliminarTarjeta(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
    this.TarjetaHttpServiceService.eliminarTarjeta(id).subscribe((data) => {
      if (data && data) {
        this.listadotarjeta = data;
      }
      this.getTarjeta();
    });
  }
  }
  )
    }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  name = 'ExcelSheet.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
