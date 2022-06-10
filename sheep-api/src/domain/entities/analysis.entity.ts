import * as crypto from 'crypto';

import { AnalysisStatus } from '../types';
import { Member } from './member.entity';

export class Analysis {
  public readonly id: string;
  public readonly status: AnalysisStatus;
  public readonly observation: string;
  public readonly member: Member;

  constructor({ id, status, observation, member }: Partial<Analysis>) {
    this.id = id || crypto.randomUUID();
    this.status = status;
    this.observation = observation;
    this.member = member;
  }
}
