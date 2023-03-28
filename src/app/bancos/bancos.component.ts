import { Component, OnInit } from '@angular/core';
import { BancosService } from '../services/bancos.service';
import { MenuItem } from 'primeng/api';
import {BancoDto } from '../Dto/Bancos.dto';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { Router } from '@angular/router';
 import { VERSION } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent implements OnInit {
items: MenuItem[] = [];
activeItem!: MenuItem;
activeItem2!: MenuItem;

   BancoForm: FormGroup;
  Banco: BancoDto[] = []; //poner
  

  constructor(private BancoService: BancosService, private form: FormBuilder, private router:Router) {
     {
       this.BancoForm = this.form.group({
        nombreBancos: ['', Validators.required],
        descBancos: ['', Validators.required],
        estadoBancos: ['', Validators.required],
       fechaBancos: ['', Validators.required],
      idUsuarioBancos: ['', Validators.required],

     })
   }


  }

   ngOnInit(): void {
     this.getListaBanco();
   }

getListaBanco() {
    this.BancoService.getListado().subscribe(data => {
      this.Banco = data;
    });
  }


   agregarBancos() {
     const list: any = {
       nombreBancos: this.BancoForm.get('nombreBancos')?.value,
       descBancos: this.BancoForm.get('descBancos')?.value,
       estadoBancos: this.BancoForm.get('estadoBancos')?.value,
       fechaBancos: this.BancoForm.get('fechaBancos')?.value,
       idUsuarioBancos: this.BancoForm.get('idUsuarioBancos')?.value,
       idBancos: 0
     }
     this.BancoService.createBanco(list).subscribe(data => {
      this.getListaBanco()
     })
     this.getListaBanco() 
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
  }
  )
    }

  name = 'ExcelSheet.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  openNew(){
    this.router.navigate(['bancos']);  
  }


}