import { faker } from '@faker-js/faker';

import { Role } from '../../../domain/entities';

export const mockRole: (id?: string) => Role = (id?: string) =>
  new Role({
    id: id || faker.datatype.uuid(),
    description: faker.lorem.words(),
  });
