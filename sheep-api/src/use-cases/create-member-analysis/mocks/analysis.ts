import * as crypto from 'crypto';

import { Analysis, Member } from '../../../domain/entities';

export const mockAnalysis: (member: Member) => Analysis = (member: Member) =>
  new Analysis({ id: crypto.randomUUID(), member });
