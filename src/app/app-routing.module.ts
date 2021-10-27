import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";
import { LancamentoCadastroComponent } from "./lancamentos/lancamento-cadastro/lancamento-cadastro.component";
import { LancamentoPesquisaComponent } from "./lancamentos/lancamento-pesquisa/lancamento-pesquisa.component";
import { PessoaCadastroComponent } from "./pessoas/pessoa-cadastro/pessoa-cadastro.component";
import { PessoaPesquisaComponent } from "./pessoas/pessoa-pesquisa/pessoa-pesquisa.component";

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'lancamentos', component: LancamentoPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
  { path: 'pessoas', component: PessoaPesquisaComponent },
  { path: 'pessoas/nova', component: PessoaCadastroComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
]

@NgModule({

  imports: [
     RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
