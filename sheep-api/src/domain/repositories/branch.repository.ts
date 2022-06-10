import { Branch } from '../entities';

export interface BranchRepository {
  findById(id: BranchRepository.FindById.Params): Promise<BranchRepository.FindById.Result>;
}

export namespace BranchRepository {
  export namespace FindById {
    export type Params = string;
    export type Result = Branch;
  }
}
