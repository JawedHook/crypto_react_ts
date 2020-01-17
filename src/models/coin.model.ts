export class Coin {
  symbol: string;
  name: string;
  rank?: number;
  price?: string;
  delta_24h?: number;
  min?: number;
  max?: number;

  constructor(json: any) {
    this.symbol = json.symbol;
    this.name = json.name;
    this.rank = json.rank;
    this.price = `${json.price}`;
    this.delta_24h = json.delta_24h;
    this.min = json.min || 0
    this.max = json.max || 0
  }
}
