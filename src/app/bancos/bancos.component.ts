import { Component, OnInit } from '@angular/core';
import { BancosService } from '../services/bancos.service';
import { BancosModel } from '../entities/Bancos';
import { BancoDto } from '../Dto/Bancos.dto';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VERSION } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css'],
})
export class BancosComponent implements OnInit {
  items: MenuItem[] = [];
  activeItem!: MenuItem;
  activeItem2!: MenuItem;
  BancoForm: FormGroup;
  Banco: BancoDto[] = []; //poner

  constructor(
    private BancoService: BancosService,
    private form: FormBuilder,
    private router: Router,
    private messageService: MessageService)
   {
    {
      this.BancoForm = this.form.group({
        nombreBancos: ['', Validators.required],
        descBancos: ['', Validators.required],
        estadoBancos: ['', Validators.required],
        fechaBancos: [new Date().toISOString().substr(0, 10),
          Validators.required,],
        idUsuarioBancos: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {
    this.getListaBanco();
  }

  getListaBanco() {
    this.BancoService.getListado().subscribe((data) => {
      this.Banco = data;
    });
  }

  agregarBancos() {
    let Bancos: BancosModel = this.BancoForm.value;
    this.BancoService.createBanco(Bancos).subscribe((data) => {
      this.getListaBanco();
    });
  }


  eliminarBancoss(id: number): void {
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
        this.BancoService.eliminarBancos(id).subscribe((data) => {
          if (data && data) {
            this.Banco = data;
          }
          this.getListaBanco();
        });
      }
    });
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

  getEventValue($event: any): string {
    return $event.target.value;
  }

  openNew() {
    this.router.navigate(['bancos']);
  }


  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Correcto',
      detail: 'Se guardo Correctamente',
    });
  }
}
