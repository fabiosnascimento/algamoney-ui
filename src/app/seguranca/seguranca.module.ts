import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { MoneyHttpInterceptor } from './money-http-interceptor';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { environment } from 'src/environments/environment';
import { AuthorizedComponent } from './authorized/authorized.component';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains, //['localhost:8080'],
        disallowedRoutes: environment.tokenDisallowedRoutes //['http://localhost:8080/oauth/token']
        }
    })
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    },
    AuthGuard
  ],
  declarations: [
    AuthorizedComponent
  ]
})
export class SegurancaModule {
}
