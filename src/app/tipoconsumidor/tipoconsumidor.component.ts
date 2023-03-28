import { Component, OnInit } from '@angular/core';
import { TipoconsumidorService } from '../services/tipoconsumidor.service';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { ListadoDTO } from 'src/app/Dto/TipoConsumidor.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

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
    private router: Router
  ) {
    {
      this.ConsumidorForm = this.form.group({
        nombreTconsumidor: ['', Validators.required],
        descTconsumidor: ['', Validators.required],
        estadoTconsumidor: ['', Validators.required],
        fechaTconsumidor: ['', Validators.required],
        idUsuarioTconsumidor: ['', Validators.required],
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
    const list: any = {
      nombreTconsumidor: this.ConsumidorForm.get('nombreTconsumidor')?.value,
      descTconsumidor: this.ConsumidorForm.get('descTconsumidor')?.value,
      estadoTconsumidor: this.ConsumidorForm.get('estadoTconsumidor')?.value,
      fechaTconsumidor: this.ConsumidorForm.get('fechaTconsumidor')?.value,
      idUsuarioTconsumidor: this.ConsumidorForm.get('idUsuarioTconsumidor')
        ?.value,
    };
    this.tipoconsumidorService.createTipoConsumidor(list).subscribe((data) => {
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
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
