import { faker } from '@faker-js/faker';

import { Branch } from '../../../domain/entities';

export const mockBranch: (id?: string) => Branch = (id?: string) =>
  new Branch({
    id: id || faker.datatype.uuid(),
    address: {
      street: faker.address.street(),
      state: faker.address.state(),
      neighborhood: faker.address.cityName(),
      city: faker.address.cityName(),
      zip: faker.address.zipCode(),
      country: faker.address.country(),
    },
    description: faker.lorem.words(),
    members: [],
    phones: [],
  });
