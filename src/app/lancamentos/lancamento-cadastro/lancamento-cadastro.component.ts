import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Lancamento } from 'src/app/core/model';

export interface Categoria {
  codigo: string;
  nome: string;
}

export interface Pessoa {
  codigo: string;
  nome: string;
}

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})

export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias: any = [];
  pessoas: any = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then((lancamento: any) => {

        this.converterStringsParaDatas([lancamento]);

        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(lancamentoForm: NgForm) {
    if (this.editando) {
      this.atualizarLancamento(lancamentoForm);
    } else {
      this.adicionarLancamento(lancamentoForm);
    }
  }


  adicionarLancamento(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamentoAdicionado => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Lançamento adicionado com sucesso!'
        })

        // lancamentoForm.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo])
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(lancamentoForm: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {

        this.converterStringsParaDatas([lancamento]);

        this.lancamento = lancamento;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Lançamento alterado com sucesso!'
        })
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map((c: Categoria) => ({ label: c.nome , value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.content.map((c: Pessoa) => ({ label: c.nome , value: c.codigo}));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(lancamentoForm: NgForm) {
    lancamentoForm.reset(new Lancamento());

    this.router.navigate(['/lancamentos/novo']);
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {

    for (const lancamento of lancamentos) {

      lancamento.dataVencimento = new Date(lancamento.dataVencimento);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(lancamento.dataPagamento);
      }
    }
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }
}
