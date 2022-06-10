import * as crypto from 'crypto';

import { Document } from '../../../domain/entities';

export const mockDocument: (params: any) => Document = (params: any) => {
  return new Document({
    id: crypto.randomUUID(),
    ...params,
  });
};
