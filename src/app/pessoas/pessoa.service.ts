import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Cidade, Estado, Pessoa } from '../core/model';

export class PessoaFiltro {
  nome?: string;
  pagina = 0;
  itensPorPagina = 4;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`,
    this.cidadesUrl = `${environment.apiUrl}/cidades`,
    this.estadosUrl = `${environment.apiUrl}/estados`
   }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
      let params = new HttpParams();

      params = params.set('page', filtro.pagina);
      params = params.set('size', filtro.itensPorPagina);

      if (filtro.nome) {
        params = params.set('nome', filtro.nome);
      }

    return this.http.get(this.pessoasUrl, { params })
      .toPromise()
      .then((response: any) =>  {
        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total: response['totalElements']
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl)
      .toPromise();
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
      return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
        .toPromise()
        .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<any> {
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
      return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
        .toPromise();
  }

  buscaPorCodigo(codigo: number): Promise<Pessoa> {
      return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
        .toPromise();
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get(this.estadosUrl)
      .toPromise()
      .then();
  }

  pesquisarCidades(estado: any): Promise<Cidade[]> {
    let params = new HttpParams();
    params = params.set('estado', estado);
    return this.http.get(this.cidadesUrl, { params })
      .toPromise()
      .then();
  }
}

