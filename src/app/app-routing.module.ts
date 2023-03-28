import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormapagoComponent } from './formapago/formapago.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { TipoconceptoComponent } from './tipoconcepto/tipoconcepto.component';
import { TipoconsumidorComponent } from './tipoconsumidor/tipoconsumidor.component';
import { BancosComponent } from './bancos/bancos.component';
import { CentrocostoComponent } from './centrocostos/centrocosto.component';

const routes: Routes = [
  { path: '', redirectTo: '/tarjeta', pathMatch: 'full' },
  { path: 'tarjeta', component: TarjetaComponent },
  { path: 'pagos', component: FormapagoComponent },
  { path: 'tipoconcepto', component: TipoconceptoComponent },
  { path: 'tipoconsumidor', component: TipoconsumidorComponent },
  { path: 'bancos', component: BancosComponent },
  { path: 'centro_costo', component: CentrocostoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule, CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
