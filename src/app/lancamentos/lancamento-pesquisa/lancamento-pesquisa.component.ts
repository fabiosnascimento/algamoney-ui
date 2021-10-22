import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styles: [
  ]
})

export class LancamentoPesquisaComponent {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos: any = [];
  @ViewChild('tabela') grid: { reset: () => void; };

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService
    ) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: "Tem certeza que deseja excluir?",
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset();

        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:'Lançamento excluído com sucesso!'
        });
      });
  }
}
