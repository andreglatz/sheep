import { Injectable } from '@nestjs/common';
import { Role } from 'src/domain/entities';
import { RoleRepository } from 'src/domain/repositories';

import { PrismaService } from './prisma.service';

@Injectable()
export class RolePrismaRepository implements RoleRepository {
  constructor(private readonly db: PrismaService) {}

  async findById(id: string): Promise<Role> {
    return this.db.role.findFirst({ where: { id } });
  }
}
