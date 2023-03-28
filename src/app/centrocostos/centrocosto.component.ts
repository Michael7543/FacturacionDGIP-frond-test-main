import { Component, OnInit } from '@angular/core';
import { CentroCostoDto } from '../Dto/CentroCosto.dto';
import { CentroCostoService } from '../services/centrocosto.service ';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { CentroCostoModel } from '../entities/CentroCosto';

@Component({
  selector: 'app-centrocos',
  templateUrl: './centrocosto.component.html',
  styleUrls: ['./centrocosto.component.css']
})
export class CentrocostoComponent implements OnInit {
  [x: string]: any;

  centrocosto: CentroCostoDto[] = [];

  CentrocostoForm: FormGroup
  



  constructor(private centroCostoService: CentroCostoService, private form: FormBuilder, private router: Router) {

    {
      this.CentrocostoForm = this.form.group({
        codCentroCosto: ['', Validators.required],
        nombreCentroCosto: ['', Validators.required],
        descCentroCosto: ['', Validators.required],
        estadoCentroCosto: ['', Validators.required],
        fechaCentroCosto: ['', Validators.required],
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
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

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

}
