import * as crypto from 'crypto';
import { faker } from '@faker-js/faker';

import { CreateMemberAnalysis } from '../../../domain/use-cases';
import { MaritalStatus, Sex } from '../../../domain/types';

export const mockParams: () => CreateMemberAnalysis.Params = () => ({
  name: faker.name.findName(),
  birhtDate: faker.date.birthdate(),
  maritalStatus: MaritalStatus.SINGLE,
  documents: [
    { value: faker.random.numeric(9), type: 'RG' },
    { value: faker.random.numeric(11), type: 'CPF' },
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
  branchId: crypto.randomUUID(),
  isLeader: faker.datatype.boolean(),
  roleId: crypto.randomUUID(),
  baptism: {
    place: faker.address.cityName(),
    date: faker.date.past(),
  },
  cieadespel: faker.random.numeric(9),
  cgadb: faker.random.numeric(9),
});
