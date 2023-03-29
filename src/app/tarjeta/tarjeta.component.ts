import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Tarjeta, TarjetaModel } from '../entities/tarjeta';
import { TarjetaHttpServiceService } from '../services/tarjeta-http-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaDTO } from '../Dto/Tarjeta.dto';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { TipoConsumidorModel } from '../entities/TipoConsumidor';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css'],
})
export class TarjetaComponent implements OnInit {

  TarjetaForm: FormGroup;
  listadotarjeta: TarjetaDTO[] = []; //poner

  constructor(private TarjetaHttpServiceService: TarjetaHttpServiceService, private form: FormBuilder,private messageService: MessageService) {
    {
      this.TarjetaForm = this.form.group({
        nombreTarjeta: ['', Validators.required],
        descTarjeta: ['', Validators.required],
        stateTarjeta: ['', Validators.required],
        dateTarjeta: [new Date().toISOString().substr(0, 10),
          Validators.required,],
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
    const element: HTMLElement | null = document.getElementById('season-tble');
    if (!element) {
      console.error('No se ha encontrado el elemento con el ID "season-tble".');
      return;
    }

    // Obtener todas las filas de la tabla y convertirlas en una matriz de objetos
    const rows: HTMLCollectionOf<HTMLTableRowElement> =
      element.getElementsByTagName('tr');
    const data: { [key: string]: string }[] = [];
    for (let i = 0; i < rows.length; i++) {
      const row: HTMLTableRowElement = rows[i];
      const cells: HTMLCollectionOf<HTMLTableCellElement> =
        row.getElementsByTagName('td');
      const rowData: { [key: string]: string } = {};
      for (let j = 0; j < cells.length; j++) {
        if (j !== 6) {
          // Excluir la tercera columna (por ejemplo)
          const cell: HTMLTableCellElement = cells[j];
          const cellValue: string = cell.innerText.trim();
          rowData[`column${j + 1}`] = cellValue;
        }
      }
      data.push(rowData);
    }

    // Convertir la matriz de objetos en una hoja de trabajo de Excel
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Crear un nuevo libro de trabajo y agregar la hoja de trabajo
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    // Escribir el libro de trabajo en un archivo de Excel
    XLSX.writeFile(book, this.name);
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Correcto',
      detail: 'Se guardo Correctamente',
    });
  }



}
