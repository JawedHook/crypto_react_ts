export class Coins {
  symbol: string;
  name: string;
  rank: number;
  price: number;
  delta_24h: number;

  constructor(json: any) {
    this.symbol = json.symbol;
    this.name = json.name;
    this.rank = json.rank;
    this.price = json.price;
    this.delta_24h = json.delta_24h;
  }
}
