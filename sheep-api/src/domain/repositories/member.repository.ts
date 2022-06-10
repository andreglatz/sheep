import { Member } from '../entities';

export interface MemberRepository {
  findByDocuments(params: FindByDocuments.Params): Promise<FindByDocuments.Result>;
}

export namespace FindByDocuments {
  type Document = { value: string; type: 'RG' | 'CPF' };
  export type Params = Document[];

  export type Result = Member[];
}
