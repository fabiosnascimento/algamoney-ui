import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})

export class PessoaPesquisaComponent {

 totalRegistros = 0;
 filtro = new PessoaFiltro();
 pessoas: any = [];

 constructor(private pessoaService: PessoaService) {}

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
}
