import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styles: [
  ]
})

export class LancamentoPesquisaComponent implements OnInit {

  descricao: string = '';
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  lancamentos: any = [];

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    }

    this.lancamentoService.pesquisar(filtro)
      .then(lancamentos => this.lancamentos = lancamentos);
  }
}
