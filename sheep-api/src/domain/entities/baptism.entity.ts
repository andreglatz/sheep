import * as crypto from 'crypto';

export class Baptism {
  public readonly id: string;
  public readonly place: string;
  public readonly date: Date;

  constructor({ id, place, date }: Partial<Baptism>) {
    this.id = id || crypto.randomUUID();
    this.place = place;
    this.date = date;
  }
}
