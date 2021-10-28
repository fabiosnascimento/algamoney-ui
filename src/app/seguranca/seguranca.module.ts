import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';


@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    }),

    SegurancaRoutingModule
  ],
  providers: [JwtHelperService]
})
export class SegurancaModule { }
