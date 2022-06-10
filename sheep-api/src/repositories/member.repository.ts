import { Injectable } from '@nestjs/common';

import { Branch, Member, Document } from '../domain/entities';
import { FindByDocuments, MemberRepository } from '../domain/repositories';
import { MaritalStatus, Sex, DocumentType } from '../domain/types';

import { PrismaService } from './prisma.service';

@Injectable()
export class MemberPrismaRepository implements MemberRepository {
  constructor(private readonly db: PrismaService) {}

  async findByDocuments(documents: FindByDocuments.Params): Promise<FindByDocuments.Result> {
    const members = await this.db.member.findMany({
      where: {
        OR: documents.map((doc) => ({
          documents: {
            some: {
              type: doc.type,
              value: doc.value,
            },
          },
        })),
      },
      include: { branch: true, baptism: true, role: true, documents: true },
    });

    return members.map(
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
    );
  }
}
