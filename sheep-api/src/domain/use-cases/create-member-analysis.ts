import { Address, Admission, MaritalStatus, Sex } from '../types';

export interface CreateMemberAnalysis {
  create(member: CreateMemberAnalysis.Params): Promise<CreateMemberAnalysis.Result>;
}

export namespace CreateMemberAnalysis {
  export type Params = {
    name: string;
    birhtDate: Date;
    maritalStatus: MaritalStatus;
    documents: { value: string; type: 'RG' | 'CPF' }[];
    sex: Sex;
    email: string;
    phones: string[];
    photo: string;
    memo: string;
    isDead?: boolean;
    placeOfBirth: string;
    address: Address;
    admission: Admission;
    branchId: string;
    isLeader: boolean;
    roleId: string;
    baptism?: { place: string; date: Date };
    cieadespel?: string;
    cgadb?: string;
  };

  export type Result = {
    id: string;
    status: string;
    member: {
      id: string;
      name: string;
      birhtDate: string;
      sex: Sex;
      documents: { id: string; value: string; type: string }[];
      email: string;
      phones: string[];
      photo: string;
      memo: string;
      isDead?: boolean;
      branch: { id: string; description: string };
      isLeader: boolean;
      role: { id: string; description: string };
      cieadespel?: string;
      cgadb?: string;
    };
  };
}
