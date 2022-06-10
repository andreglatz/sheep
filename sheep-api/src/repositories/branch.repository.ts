import { Injectable } from '@nestjs/common';

import { MaritalStatus, Sex, DocumentType } from '../domain/types';
import { Branch, Member, Document } from '../domain/entities';
import { BranchRepository } from '../domain/repositories';

import { PrismaService } from './prisma.service';

@Injectable()
export class BranchPrismaRepository implements BranchRepository {
  constructor(private readonly db: PrismaService) {}

  async findById(id: string): Promise<Branch> {
    const branch = await this.db.branch.findFirst({
      where: { id },
      include: { members: { include: { branch: true, baptism: true, role: true, documents: true } } },
    });

    return new Branch({
      ...branch,
      members: branch.members.map(
        (member) =>
          new Member({
            ...member,
            birhtDate: new Date(member.birhtDate),
            maritalStatus: member.maritalStatus as MaritalStatus,
            sex: member.sex as Sex,
            documents: member.documents.map(
              (doc) => new Document({ id: doc.id, type: doc.type as DocumentType, value: doc.value }),
            ),
            branch: new Branch({
              ...member.branch,
              address: {
                street: member.branch.street,
                neighborhood: member.branch.neighborhood,
                city: member.branch.city,
                state: member.branch.state,
                country: member.branch.country,
                zip: member.branch.zip,
              },
            }),
          }),
      ),
      address: {
        street: branch.street,
        neighborhood: branch.neighborhood,
        city: branch.city,
        state: branch.state,
        country: branch.country,
        zip: branch.zip,
      },
    });
  }
}
