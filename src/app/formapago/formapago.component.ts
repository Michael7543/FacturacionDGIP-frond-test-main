import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { FormaPagoDTO } from '../Dto/FormaPago.dto';
import { FormapagoService } from '../services/formapago.service';
import * as XLSX from 'xlsx';
import { FormaPagoModel } from '../entities/FormaPago';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-formapago',
  templateUrl: './formapago.component.html',
  styleUrls: ['./formapago.component.css']
})
export class FormapagoComponent implements OnInit {

  items: MenuItem[] = [];
  activeItem!: MenuItem;
  activeItem2!: MenuItem;
  PagoForm: FormGroup;
  formapago: FormaPagoDTO[] = []; //poner

  constructor(private formapagoService: FormapagoService, private form: FormBuilder, private router:Router,private messageService: MessageService) {
    {
      this.PagoForm = this.form.group({
        nombreFp: ['', Validators.required],
        codigoSri: ['', Validators.required],
        activo: ['', Validators.required],
        codigoSae: ['', Validators.required],
        descripcionFp: ['', Validators.required],
        fechaFp: ['', Validators.required],
        idUsuarioFp: ['', Validators.required],

    })
  }


 }

  ngOnInit(): void {
    this.getListaFPago();
  }

  getListaFPago() {
    this.formapagoService.getFormaPago().subscribe(data => {
      this.formapago = data;
    });
  }

/*   agregarFormaPago() {
    const list: any = {
      nombreFp: this.PagoForm.get('nombreFp')?.value,
      codigoSri: this.PagoForm.get('codigoSri')?.value,
      activo: this.PagoForm.get('activo')?.value,
      codigoSae: this.PagoForm.get('codigoSae')?.value,
      descripcionFp: this.PagoForm.get('descripcionFp')?.value,
      fechaFp: this.PagoForm.get('fechaFp')?.value,
      idUsuarioFp: this.PagoForm.get('idUsuarioFp')?.value,
      idFormaPago: 0
    }
    this.formapagoService.createFPago(list).subscribe(data => {
     this.getListaFPago()
    })
    this.getListaFPago() 
  } */

    agregarFormaPago() {
    let Formapago: FormaPagoModel = this.PagoForm.value;

    this.formapagoService
      .createFPago(Formapago)
      .subscribe((data) => {
        this.getListaFPago();
      });
  } 




  eliminarFormaPago(id: number): void {
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
    this.formapagoService.eliminarFormaPago(id).subscribe((data) => {
      if (data && data) {
        this.formapago = data;
      }
      this.getListaFPago();
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
        if (j !== 8) {
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
