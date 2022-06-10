import * as crypto from 'crypto';
import { faker } from '@faker-js/faker';

import { MaritalStatus, Sex, DocumentType } from '../../../domain/types';
import { Member } from '../../../domain/entities';

export const mockMember: (params?: any) => Member = (params?: any) => ({
  id: crypto.randomUUID(),
  name: faker.name.findName(),
  birhtDate: faker.date.birthdate(),
  maritalStatus: MaritalStatus.SINGLE,
  documents: [
    { id: crypto.randomUUID(), value: faker.random.numeric(9), type: DocumentType.RG },
    { id: crypto.randomUUID(), value: faker.random.numeric(11), type: DocumentType.CPF },
  ],
  sex: Sex.MALE,
  email: faker.internet.email(),
  phones: [faker.phone.phoneNumber(), faker.phone.phoneNumber()],
  photo: faker.internet.url(),
  memo: faker.lorem.words(),
  isDead: faker.datatype.boolean(),
  placeOfBirth: faker.address.city(),
  address: {
    street: faker.address.street(),
    state: faker.address.state(),
    neighborhood: faker.address.cityName(),
    city: faker.address.cityName(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
  },
  admission: {
    origen: faker.lorem.word(),
    type: faker.lorem.word(),
    date: faker.datatype.datetime(),
  },
  branch: {
    id: crypto.randomUUID(),
    description: faker.lorem.word(),
    address: {
      street: faker.address.street(),
      state: faker.address.state(),
      neighborhood: faker.address.cityName(),
      city: faker.address.cityName(),
      zip: faker.address.zipCode(),
      country: faker.address.country(),
    },
    members: [],
    phones: [],
  },
  isLeader: faker.datatype.boolean(),
  role: { id: crypto.randomUUID(), description: faker.lorem.word() },
  baptism: {
    id: crypto.randomUUID(),
    place: faker.address.cityName(),
    date: faker.date.past(),
  },
  cieadespel: faker.random.numeric(9),
  cgadb: faker.random.numeric(9),
});
