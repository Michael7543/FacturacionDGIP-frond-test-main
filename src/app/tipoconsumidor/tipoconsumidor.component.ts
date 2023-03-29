import { Component, OnInit } from '@angular/core';
import { TipoconsumidorService } from '../services/tipoconsumidor.service';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ListadoDTO } from 'src/app/Dto/TipoConsumidor.dto';
import { TipoConsumidorModel } from '../entities/TipoConsumidor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tipoconsumidor',
  templateUrl: './tipoconsumidor.component.html',
  styleUrls: ['./tipoconsumidor.component.css'],
})
export class TipoconsumidorComponent implements OnInit {
  items: MenuItem[] = [];
  activeItem!: MenuItem;
  activeItem2!: MenuItem;
  listado: ListadoDTO[] = []; //poner
  ConsumidorForm!: FormGroup;
  constructor(
    private tipoconsumidorService: TipoconsumidorService,
    private form: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    {
      this.ConsumidorForm = this.form.group({
        nombreTconsumidor: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-Z\s]*$/),
          ],
        ],
        descTconsumidor: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
          ],
        ],
        estadoTconsumidor: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(10),
          ],
        ],
        fechaTconsumidor: [
          new Date().toISOString().substr(0, 10),
          Validators.required,
        ],
        idUsuarioTconsumidor: [1, Validators.required],
      });
    }
  }

  ngOnInit(): void {
    this.getTiposConsumidor();
  }
  getTiposConsumidor() {
    this.tipoconsumidorService.getListado().subscribe((data) => {
      this.listado = data;
    });
  }

  agregarTipoConsumidor() {
    let tipoConsumidor: TipoConsumidorModel = this.ConsumidorForm.value;
    this.tipoconsumidorService
      .createTipoConsumidor(tipoConsumidor)
      .subscribe((data) => {
        this.getTiposConsumidor();
      });
  }

  eliminarTipoConsumidor(id: number): void {
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
        this.tipoconsumidorService
          .eliminarTipoConsumidor(id)
          .subscribe((data) => {
            if (data && data) {
              this.listado = data;
            }
            this.getTiposConsumidor();
          });
      }
    });
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }
  envio() {
    this.router.navigate(['/tipoconsumidor']);
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
