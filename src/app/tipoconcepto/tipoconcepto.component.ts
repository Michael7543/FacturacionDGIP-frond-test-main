import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoConceptoModel, TipoConcepto } from '../entities/TipoConcepto';
import { TipoconceptoService } from '../services/tipoconcepto.service';
import { TipoConceptoDTO } from '../Dto/TipoConcepto.dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tipoconcepto',
  templateUrl: './tipoconcepto.component.html',
  styleUrls: ['./tipoconcepto.component.css']
})

export class TipoconceptoComponent implements OnInit {


  TipoconceptoForm: FormGroup;
  listadoconcepto: TipoConceptoDTO[] = []; //poner


  constructor(private tipoconceptoService: TipoconceptoService, private form: FormBuilder,private router:Router) {
    {
      this.TipoconceptoForm = this.form.group({
        nombreTipoConcepto: ['', Validators.required],
        descTipoConcepto: ['', Validators.required],
        idUnidadTc: ['', Validators.required],
        prtidaNc: ['', Validators.required],
        fechaTc: ['', Validators.required],
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
    this.getTipoConcepto();
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
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }




}





