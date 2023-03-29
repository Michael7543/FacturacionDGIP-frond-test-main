import { Component, OnInit } from '@angular/core';
import { CentroCostoDto } from '../Dto/CentroCosto.dto';
import { CentroCostoService } from '../services/centrocosto.service ';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { CentroCostoModel } from '../entities/CentroCosto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-centrocos',
  templateUrl: './centrocosto.component.html',
  styleUrls: ['./centrocosto.component.css']
})
export class CentrocostoComponent implements OnInit {
  [x: string]: any;

  centrocosto: CentroCostoDto[] = [];

  CentrocostoForm: FormGroup
  



  constructor(private centroCostoService: CentroCostoService, private form: FormBuilder, private router: Router,private messageService: MessageService) {

    {
      this.CentrocostoForm = this.form.group({
        codCentroCosto: ['', Validators.required],
        nombreCentroCosto: ['', Validators.required],
        descCentroCosto: ['', Validators.required],
        estadoCentroCosto: ['', Validators.required],
        fechaCentroCosto: [ new Date().toISOString().substr(0, 10),
          Validators.required,],
        idUsuarioCentroCosto: ['', Validators.required],
      })
    }
  }





  ngOnInit(): void {


    this.getCentroCosto();



  }

  getCentroCosto() {
    this.centroCostoService.getCentroCosto().subscribe(data => {
      this.centrocosto = data;
    });
  }


 /*  agregarCentroCosto() {
    const list: any = {
      codCentroCosto: this.CentrocostoForm.get('codCentroCosto')?.value,
      nombreCentroCosto: this.CentrocostoForm.get('nombreCentroCosto')?.value,
      descCentroCosto: this.CentrocostoForm.get('descCentroCosto')?.value,
      estadoCentroCosto: this.CentrocostoForm.get('estadoCentroCosto')?.value,
      fechaCentroCosto: this.CentrocostoForm.get('fechaCentroCosto')?.value,
      idUsuarioCentroCosto: this.CentrocostoForm.get('idUsuarioCentroCosto')?.value,
      idCentroCosto: 0,
    }
    this.centroCostoService.createCentroCosto(list).subscribe(data => {
      this.getCentroCosto()
    })
    this.getCentroCosto()

  } */


   agregarCentroCosto() {
    let Centrocosto: CentroCostoModel = this.CentrocostoForm.value;
    this.centroCostoService
      .createCentroCosto(Centrocosto)
      .subscribe((data) => {
        this.getCentroCosto();
      });
  }  
  

  
  eliminarCentroCosto(id: number): void {
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
        this.centroCostoService.eliminarCentroCosto(id).subscribe((data) => {
      if (data && data) {
        this['centrocosto'] = data;
      }
      this.getCentroCosto();
    });
  }
  }
  )
    }

  getEventValue($event: any): string {
    return $event.target.value;
  }


  openNew(){
    this.router.navigate(['centrocosto']);
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


  // elimiCentrocosto(id: number): void {
  //   this.centroCostoService.eliminarCentroCosto(id).subscribe((data) => {
  //     if (data && data) {
  //       this.centrocosto = data;
  //     }
  //     this.getCentroCosto();
  //   });
  // }


  // getEventValue($event: any): string {
  //   return $event.target.value;
  // }

  // openNew() {
  //   this.router.navigate(['centroCosto']);
  // }
  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Correcto',
      detail: 'Se guardo Correctamente',
    });
  }
}
