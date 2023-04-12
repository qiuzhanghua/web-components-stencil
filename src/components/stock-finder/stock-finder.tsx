import { Component, Event, EventEmitter, State, h } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement;
  @State() searchResults: { symbol: string, name: string }[] = [];
  @State() searchResultsError: string;
  @Event({bubbles: true, composed: true}) stockSymbolSelected: EventEmitter<string>;

  onFindStocks = (event: Event) => {
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    this.fetchStocks(stockName);
  };


  private fetchStocks(stockName: string) {
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Invalid!');
        }
        return res.json();
      })
      .then(parsedRes => {
        this.searchResults = parsedRes['bestMatches'].map(match => {
          return { symbol: match['1. symbol'], name: match['2. name'] };
        });
        console.log(parsedRes);
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSelectSymbol(symbol: string) {
    this.stockSymbolSelected.emit(symbol);
  }

  render() {
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input id='stock-symbol' ref={el => this.stockNameInput = el} />
        <button type='submit'>Find</button>
      </form>,
      <ul>
        {this.searchResults.map(result => <li onClick={this.onSelectSymbol.bind(this, result.symbol)}><strong>{result.symbol}</strong> - {result.name}</li>)}
      </ul>,
    ];
  }
}
