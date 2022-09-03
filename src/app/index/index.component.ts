import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { CurrencyService } from '../currency/service/currency.service';
import { Currency } from '../currency/vo/Currency';
import { DocsService } from '../docs/service/docs.service';
import { Docs } from '../docs/vo/Docs';
import { DocsEntradaDTO } from '../docs/vo/DocsEntradaDTO';
import { GlobalVariableService } from '../global/global-variable';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [ './index.component.css' ],
  providers: [CurrencyService, DocsService, GlobalVariableService, MessageService]
})
export class IndexComponent implements OnInit {

  // Document Number
  documentNumber: any;

  // Currency
  currency: Currency[] = [];
  selectedCurrency: Currency = new Currency;

  // Document Date
  documentDateRange : any;

  // Docs
  docs: Docs[] = [];
  doc: any;

  constructor(private currencyService: CurrencyService,
              private docsService: DocsService,
              private messageService: MessageService) {

  }

  ngOnInit(): void {

    this.currencyService.findAllCurrency().subscribe(
      currencys => {
        if (currencys == null || currencys.length == 0) {
          this.messageService.add({severity:'warn', summary:'Service Message', detail:'Lista De Currencys Não Encontradas.'});
        } else {
          debugger;
          this.currency = currencys;
          this.messageService.add({severity:'success', summary:'Service Message', detail:'Lista De Currencys Encontradas.'});
        }
      },
      error => {
        this.messageService.add({severity:'error', summary:'Service Message', detail:'Erro Ou Não Existe Currencys Cadastradas.'});
      }
    );

    this.docsService.findAllDocs().subscribe(
      docs => {
        if (docs == null || docs.length == 0) {
          this.messageService.add({severity:'warn', summary:'Service Message', detail:'Lista De Docs Não Encontradas.'});
        } else {
          this.docs = docs;
          this.messageService.add({severity:'success', summary:'Service Message', detail:'Lista De Docs Encontradas, Exibindo Na Tabela, Caso Queira Filtrar Use Os Filtros Acima.'});
        }
      },
      error => {
        this.messageService.add({severity:'error', summary:'Service Message', detail:'Erro Ou Não Existe Docs Cadastradas.'});
      }
    );
  }

  oncClickSearch () {
    
    let docsEntradaDTO: DocsEntradaDTO = new DocsEntradaDTO;

    if (this.documentNumber != null || this.documentNumber != 0) {
      docsEntradaDTO.documentNumber = this.documentNumber;
    }

    if (this.selectedCurrency != null) {
      docsEntradaDTO.currencyCode = this.selectedCurrency.currencyCode;
    }

    if (this.documentDateRange != null && this.documentDateRange.length != 0) {
      docsEntradaDTO.documentDateInicio = this.documentDateRange[0];
      docsEntradaDTO.documentDateFim = this.documentDateRange[1];
    }

    this.docsService.findAllDocsToFilter(docsEntradaDTO).subscribe(
      docs => {
        if (docs == null || docs.length == 0) {
          this.docs = [];
          this.messageService.add({severity:'warn', summary:'Service Message', detail:'Lista De Docs Não Encontradas.'});
        } else {
          this.docs = docs;
          this.messageService.add({severity:'success', summary:'Service Message', detail:'Lista De Docs Encontradas, Exibindo Na Tabela, Caso Queira Filtrar Use Os Filtros Acima.'});
        }
      },
      error => {
        this.messageService.add({severity:'error', summary:'Service Message', detail:'Erro Ou Não Existe Docs Cadastradas.'});
      }
    );
  }

  oncClickClean () {
    this.documentNumber = null;
    this.documentDateRange = null;
  }
}
