import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

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

  constructor(private lancamentoService: LancamentoService) {}

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
}
