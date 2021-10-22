import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      msg = 'Erro ao processar o serviço remoto. Tente novamente';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: msg
    })
  }
}