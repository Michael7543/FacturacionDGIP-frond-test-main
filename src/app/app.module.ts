import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { SkeletonModule } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { SplitterModule } from 'primeng/splitter';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { DockModule } from 'primeng/dock';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PickListModule } from 'primeng/picklist';
import { KeyFilterModule } from 'primeng/keyfilter';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';


import { MenuModule } from 'primeng/menu';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { HeaderComponent } from './layout/header/header.component';
import { FormapagoComponent } from './formapago/formapago.component';
import { TipoconceptoComponent } from './tipoconcepto/tipoconcepto.component';
import { TipoconsumidorComponent } from './tipoconsumidor/tipoconsumidor.component';
import { LayoutModule } from './layout/layout.module';
import { BancosComponent } from './bancos/bancos.component';

import { CentrocostoComponent } from './centrocostos/centrocosto.component';

@NgModule({
  declarations: [
    AppComponent,
    TarjetaComponent,
    FormapagoComponent,
    TipoconceptoComponent,
    TipoconsumidorComponent,
    BancosComponent,
    CentrocostoComponent,
  ],
  imports: [
    MenuModule,
    KeyFilterModule,
    PickListModule,
    DockModule,
    TabMenuModule,
    MenubarModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    TabViewModule,
    SplitterModule,
    DividerModule,
    ImageModule,
    SkeletonModule,
    BadgeModule,
    BrowserModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SidebarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    ScrollPanelModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
