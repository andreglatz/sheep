import { Role } from '../entities';

export interface RoleRepository {
  findById(id: RoleRepository.FindById.Params): Promise<RoleRepository.FindById.Result>;
}

export namespace RoleRepository {
  export namespace FindById {
    export type Params = string;
    export type Result = Role;
  }
}
