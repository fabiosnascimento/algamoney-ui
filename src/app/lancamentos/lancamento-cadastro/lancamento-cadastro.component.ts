import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  formulario: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  get uploadHeaders() {
    return this.lancamentoService.uploadHeaders();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor ? null : { tamanhoMinimo: { tamanho: valor } } )
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then((lancamento: any) => {

        this.converterStringsParaDatas([lancamento]);

        this.formulario.patchValue(lancamento)
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
      .then(lancamentoAdicionado => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Lançamento adicionado com sucesso!'
        })

        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo])
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {

        this.converterStringsParaDatas([lancamento]);

        this.formulario.patchValue(lancamento);

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

  novo() {
    this.formulario.reset(new Lancamento());

    this.router.navigate(['/lancamentos/novo']);
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {

    for (const lancamento of lancamentos) {
      //Evita bug na hora da edição, adiciona o timezone do usuário
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento).getTime() + offset);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }
}
