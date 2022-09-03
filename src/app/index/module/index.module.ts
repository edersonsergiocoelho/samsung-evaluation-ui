import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { IndexComponent } from '../index.component';
import { IndexRoutingModule } from './index-routing.module';

// PrimeNG
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {FieldsetModule} from 'primeng/fieldset';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    //PrimeNG
    ButtonModule,
    ToolbarModule,
    FieldsetModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    ToastModule
  ],
  exports: [
    IndexRoutingModule,
    IndexComponent
  ],
  declarations: [IndexComponent]
})
export class IndexModule { }
