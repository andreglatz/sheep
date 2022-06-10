import * as crypto from 'crypto';

import { Address } from '../types';
import { Member } from './member.entity';

export class Branch {
  public readonly id: string;
  public readonly description: string;
  public readonly address: Address;
  public readonly members: Member[];
  public readonly phones: string[];

  constructor(params: Partial<Branch>) {
    this.id = params.id || crypto.randomUUID();
    this.description = params.description;
    this.address = params.address;
    this.members = params.members;
    this.phones = params.phones;
  }
}
