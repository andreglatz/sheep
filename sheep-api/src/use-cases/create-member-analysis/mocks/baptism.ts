import * as crypto from 'crypto';

import { Baptism } from '../../../domain/entities';

export const mockBaptism: (params?: any) => Baptism = (params?: any) =>
  new Baptism({
    id: crypto.randomUUID(),
    ...params,
  });
