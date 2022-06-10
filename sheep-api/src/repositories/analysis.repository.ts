import { Injectable } from '@nestjs/common';

import { Analysis, Branch, Member, Document } from '../domain/entities';
import { AnalysisRepository } from '../domain/repositories';
import { AnalysisStatus, MaritalStatus, Sex, DocumentType } from '../domain/types';

import { PrismaService } from './prisma.service';

@Injectable()
export class AnalysisPrismaRepository implements AnalysisRepository {
  constructor(private readonly db: PrismaService) {}
  async create(member: Member): Promise<Analysis> {
    const analysis = await this.db.analysis.create({
      data: {
        member: {
          create: {
            id: member.id,
            name: member.name,
            birhtDate: member.birhtDate.toISOString(),
            maritalStatus: member.maritalStatus,
            sex: member.sex,
            email: member.email,
            phones: member.phones,
            photo: member.photo,
            memo: member.memo,
            isDead: member.isDead,
            placeOfBirth: member.placeOfBirth,
            ...member.address,
            admissionDate: member.admission.date,
            admissionType: member.admission.type,
            cieadespel: member.cieadespel,
            cgadb: member.cgadb,
            isLeader: member.isLeader,
            documents: { createMany: { data: member.documents.map((doc) => ({ type: doc.type, value: doc.value })) } },
            role: { connect: { id: member.role.id } },
            branch: { connect: { id: member.branch.id } },
            baptism: {
              create: {
                date: member.baptism.date.toISOString(),
                place: member.baptism.place,
              },
            },
          },
        },
      },
      include: { member: { include: { branch: true, role: true, baptism: true, documents: true } } },
    });

    return new Analysis({
      ...analysis,
      status: analysis.status as AnalysisStatus,
      member: new Member({
        ...analysis.member,
        birhtDate: new Date(analysis.member.birhtDate),
        maritalStatus: analysis.member.maritalStatus as MaritalStatus,
        sex: analysis.member.sex as Sex,
        documents: analysis.member.documents.map(
          (doc) => new Document({ id: doc.id, type: doc.type as DocumentType, value: doc.value }),
        ),
        branch: new Branch({
          ...analysis.member.branch,
          address: {
            street: analysis.member.branch.street,
            neighborhood: analysis.member.branch.neighborhood,
            city: analysis.member.branch.city,
            state: analysis.member.branch.state,
            country: analysis.member.branch.country,
            zip: analysis.member.branch.zip,
          },
        }),
      }),
    });
  }
}
