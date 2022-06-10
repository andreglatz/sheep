import * as crypto from 'crypto';
import { Test } from '@nestjs/testing';

import { Branch, Member, Role, Baptism, Document, Analysis } from '../../domain/entities';
import { AnalysisStatus } from '../../domain/types';
import { AnalysisRepository, BranchRepository, MemberRepository, RoleRepository } from '../../domain/repositories';
import { CreateMemberAnalysis } from '../../domain/use-cases';

import { CreateMemberAnalysisUseCase } from './create-member-analysis';
import { mockAnalysis, mockBaptism, mockBranch, mockDocument, mockMember, mockParams, mockRole } from './mocks';

describe('CreateMemberAnalysis', () => {
  let sut: CreateMemberAnalysis;
  let memberRepository: MemberRepository;
  let branchRepository: BranchRepository;
  let roleRepository: RoleRepository;
  let analysisRepository: AnalysisRepository;

  let params: CreateMemberAnalysis.Params;
  let branch: Branch;
  let role: Role;
  let baptism: Baptism;
  let documents: Document[];

  beforeEach(async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValue('random-uuid');

    params = mockParams();
    branch = mockBranch(params.branchId);
    role = mockRole(params.roleId);
    baptism = mockBaptism(params.baptism);
    documents = params.documents.map((doc) => mockDocument(doc));

    const module = await Test.createTestingModule({
      providers: [
        {
          provide: CreateMemberAnalysisUseCase,
          useFactory: (memberRepository, branchRepository, roleRepository, analysisRepository) =>
            new CreateMemberAnalysisUseCase(memberRepository, branchRepository, roleRepository, analysisRepository),
          inject: ['MemberRepository', 'BranchRepository', 'RoleRepository', 'AnalysisRepository'],
        },
        {
          provide: 'MemberRepository',
          useValue: {
            findByDocuments: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: 'BranchRepository',
          useValue: {
            findById: jest.fn().mockResolvedValue(branch),
          },
        },
        {
          provide: 'RoleRepository',
          useValue: {
            findById: jest.fn().mockResolvedValue(role),
          },
        },
        {
          provide: 'AnalysisRepository',
          useValue: {
            create: jest.fn().mockResolvedValue(
              mockAnalysis(
                new Member({
                  name: params.name,
                  birhtDate: params.birhtDate,
                  maritalStatus: params.maritalStatus,
                  sex: params.sex,
                  email: params.email,
                  phones: params.phones,
                  photo: params.photo,
                  memo: params.memo,
                  isDead: params.isDead,
                  placeOfBirth: params.placeOfBirth,
                  address: params.address,
                  admission: params.admission,
                  isLeader: params.isLeader,
                  baptism,
                  cieadespel: params.cieadespel,
                  cgadb: params.cgadb,
                  documents,
                  role,
                  branch,
                }),
              ),
            ),
          },
        },
      ],
    }).compile();

    sut = module.get(CreateMemberAnalysisUseCase);
    memberRepository = module.get<MemberRepository>('MemberRepository');
    branchRepository = module.get<BranchRepository>('BranchRepository');
    roleRepository = module.get<RoleRepository>('RoleRepository');
    analysisRepository = module.get<AnalysisRepository>('AnalysisRepository');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call memberRepository.findByDocuments', async () => {
    const spy = jest.spyOn(memberRepository, 'findByDocuments');
    await sut.create(params);
    expect(spy).toHaveBeenCalledWith(params.documents);
  });

  it('should throw if member alrady exists', async () => {
    jest.spyOn(memberRepository, 'findByDocuments').mockResolvedValue([mockMember(), mockMember()]);
    await expect(sut.create(params)).rejects.toThrow(new Error('Member already exists'));
  });

  it('should call  if member alrady exists', async () => {
    jest.spyOn(memberRepository, 'findByDocuments').mockResolvedValue([mockMember(), mockMember()]);
    await expect(sut.create(params)).rejects.toThrow(new Error('member already exists'));
  });

  it('should branchRepository.findById with correct params', async () => {
    const spy = jest.spyOn(branchRepository, 'findById');
    await sut.create(params);
    expect(spy).toHaveBeenCalledWith(params.branchId);
  });

  it('should throw branch not found if it not exists', async () => {
    jest.spyOn(branchRepository, 'findById').mockResolvedValueOnce(null);
    await expect(sut.create(params)).rejects.toThrow(new Error('branch not found'));
  });

  it('should roleRepository.findById with correct params', async () => {
    const spy = jest.spyOn(roleRepository, 'findById');
    await sut.create(params);
    expect(spy).toHaveBeenCalledWith(params.roleId);
  });

  it('should throw role not found if it not exists', async () => {
    jest.spyOn(roleRepository, 'findById').mockResolvedValueOnce(null);
    await expect(sut.create(params)).rejects.toThrow(new Error('role not found'));
  });

  it('should call analysisRepository.create with correct params', async () => {
    const spy = jest.spyOn(analysisRepository, 'create');
    await sut.create(params);

    expect(spy).toHaveBeenCalledWith(
      new Member({
        name: params.name,
        birhtDate: params.birhtDate,
        maritalStatus: params.maritalStatus,
        sex: params.sex,
        email: params.email,
        phones: params.phones,
        photo: params.photo,
        memo: params.memo,
        isDead: params.isDead,
        placeOfBirth: params.placeOfBirth,
        address: params.address,
        admission: params.admission,
        isLeader: params.isLeader,
        baptism,
        cieadespel: params.cieadespel,
        cgadb: params.cgadb,
        documents,
        role,
        branch,
      }),
    );
  });

  it('should return an analysis on success', async () => {
    const response = await sut.create(params);
    expect(response).toEqual({
      id: 'random-uuid',
      status: AnalysisStatus.PENDING,
      member: {
        id: 'random-uuid',
        name: params.name,
        birhtDate: params.birhtDate.toISOString(),
        sex: params.sex,
        documents: params.documents.map((doc) => ({ id: 'random-uuid', ...doc })),
        email: params.email,
        phones: params.phones,
        photo: params.photo,
        memo: params.memo,
        isDead: params.isDead,
        isLeader: params.isLeader,
        cieadespel: params.cieadespel,
        cgadb: params.cgadb,
        role: { id: role.id, description: role.description },
        branch: { id: branch.id, description: branch.description },
      },
    });
  });
});
