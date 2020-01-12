import { Coin } from './coin.model';

export class User {
  id: string;
  email: string;
  displayName: string;
  coins: Coin[];
  createdAt: number | Date;
  updatedAt: number | Date;

  constructor(json: firebase.firestore.DocumentSnapshot) {
    const { email, displayName, coins, createdAt, updatedAt } = json.data();

    this.id = json.id;
    this.email = email;
    this.displayName = displayName;
    this.coins = coins || [];
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
