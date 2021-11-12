export class Pessoa {
  codigo: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();
  contatos = new Array<Contato>();
}

export class Categoria {
  codigo: number;
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: number;
  cidade: string;
  estado: string;
}

export class Lancamento {
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}

export class Contato {
  codigo: Number;
  nome: string;
  email: string;
  telefone: string;
}



