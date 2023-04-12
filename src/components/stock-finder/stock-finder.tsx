import { Component, EventEmitter, Prop, State, h } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true,
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

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
        console.log(parsedRes);
      })
      .catch(err => {
      console.log(err);
    });
  }

  render() {
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input id='stock-symbol' ref={el => this.stockNameInput = el} />
        <button type='submit'>Find</button>
      </form>,
    ];
  }
}
