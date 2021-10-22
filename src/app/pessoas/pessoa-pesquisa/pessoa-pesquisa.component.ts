import { Component, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaFiltro, PessoaService } from './../pessoa.service';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})

export class PessoaPesquisaComponent {

 totalRegistros = 0;
 filtro = new PessoaFiltro();
 pessoas: any = [];
 @ViewChild('tabela') grid: any;

 constructor(
   private pessoaService: PessoaService,
   private confirmation: ConfirmationService,
   private messageService: MessageService,
   private errorHandler: ErrorHandlerService
   ) {}

pesquisar(pagina = 0) {
  this.filtro.pagina = pagina;

  this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    })
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.grid.reset();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Pessoa excluída com sucesso!'
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
