import { LancamentoService } from './lancamentos/lancamento.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { PessoaService } from './pessoas/pessoa.service';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    CoreModule,
    LancamentosModule,
    PessoasModule,

    ToastModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
