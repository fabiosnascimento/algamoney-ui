import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    LancamentosRoutingModule
  ],
  exports: []
})
export class LancamentosModule { }
