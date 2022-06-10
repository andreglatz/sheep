import * as crypto from 'crypto';

import { Address, Admission, MaritalStatus, Sex } from '../types';

import { Baptism } from './baptism.entity';
import { Branch } from './branch.entity';
import { Role } from './role.entity';
import { Document } from './document.entity';

export class Member {
  public readonly id: string;
  public readonly name: string;
  public readonly birhtDate: Date;
  public readonly maritalStatus: MaritalStatus;
  public readonly documents: Document[];
  public readonly sex: Sex;
  public readonly email: string;
  public readonly phones: string[];
  public readonly photo: string;
  public readonly memo: string;
  public readonly isDead: boolean;
  public readonly placeOfBirth: string;
  public readonly address: Address;
  public readonly admission: Admission;
  public readonly branch: Branch;
  public readonly isLeader: boolean;
  public readonly role: Role;
  public readonly baptism: Baptism;
  public readonly cieadespel: string;
  public readonly cgadb: string;

  constructor(params: Partial<Member>) {
    this.id = params.id || crypto.randomUUID();
    this.name = params.name;
    this.birhtDate = params.birhtDate;
    this.maritalStatus = params.maritalStatus;
    this.documents = params.documents;
    this.sex = params.sex;
    this.email = params.email;
    this.phones = params.phones;
    this.photo = params.photo;
    this.memo = params.memo;
    this.isDead = params.isDead || false;
    this.placeOfBirth = params.placeOfBirth;
    this.address = params.address;
    this.admission = params.admission;
    this.branch = params.branch;
    this.isLeader = params.isLeader || false;
    this.role = params.role;
    this.baptism = params.baptism;
    this.cieadespel = params.cieadespel;
    this.cgadb = params.cgadb;
  }
}
