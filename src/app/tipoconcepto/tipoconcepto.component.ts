import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoConceptoModel, TipoConcepto } from '../entities/TipoConcepto';
import { TipoconceptoService } from '../services/tipoconcepto.service';
import { TipoConceptoDTO } from '../Dto/TipoConcepto.dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-tipoconcepto',
  templateUrl: './tipoconcepto.component.html',
  styleUrls: ['./tipoconcepto.component.css']
})

export class TipoconceptoComponent implements OnInit {


  TipoconceptoForm: FormGroup;
  listadoconcepto: TipoConceptoDTO[] = []; //poner


  constructor(private tipoconceptoService: TipoconceptoService, private form: FormBuilder,private router:Router,  private messageService: MessageService) {
    {
      this.TipoconceptoForm = this.form.group({
        nombreTipoConcepto: ['', Validators.required],
        descTipoConcepto: ['', Validators.required],
        idUnidadTc: ['', Validators.required],
        prtidaNc: ['', Validators.required],
        fechaTc: [ new Date().toISOString().substr(0, 10),
          Validators.required,],
        idUsuarioTc: ['', Validators.required],

      })
    }

  }




  ngOnInit(): void {
    this.getTipoConcepto();
  }

  getTipoConcepto() {
    this.tipoconceptoService.getListado().subscribe(data => {
      this.listadoconcepto = data;
    });
  }

  agregarTipoConcepto() {
    let tipoconcepto: TipoConceptoModel = this.TipoconceptoForm.value
    this.tipoconceptoService.createTipoConcepto(tipoconcepto).subscribe(data => {
      this.getTipoConcepto();
    })
  }


  eliminarTipoConcepto(id: number): void {
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
    this.tipoconceptoService.eliminarTipoConcepto(id).subscribe((data) => {
      
      if (data && data) {
        this.listadoconcepto = data;
      }
      this.getTipoConcepto();
    });
  }
  }
  )
    }

  getEventValue($event: any): string {
    return $event.target.value;
  }


  openNew(){
    this.router.navigate(['tipoconcepto']);
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
        if (j !== 7) {
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





