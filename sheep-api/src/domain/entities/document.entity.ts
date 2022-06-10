import * as crypto from 'crypto';

import { DocumentType } from '../types';

export class Document {
  public readonly id: string;
  public readonly type: DocumentType;
  public readonly value: string;

  constructor({ id, type, value }: Partial<Document>) {
    this.id = id || crypto.randomUUID();
    this.type = type;
    this.value = value;
  }
}
