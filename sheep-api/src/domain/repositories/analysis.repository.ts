import { Analysis, Member } from '../entities';

export interface AnalysisRepository {
  create(member: AnalysisRepository.Create.Params): Promise<AnalysisRepository.Create.Result>;
}

export namespace AnalysisRepository {
  export namespace Create {
    export type Params = Member;
    export type Result = Analysis;
  }
}
