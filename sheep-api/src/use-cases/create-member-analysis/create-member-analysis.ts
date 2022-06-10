import { Member, Document, Baptism } from '../../domain/entities';
import { AnalysisStatus, DocumentType } from '../../domain/types';
import { AnalysisRepository, BranchRepository, MemberRepository, RoleRepository } from '../../domain/repositories';
import { CreateMemberAnalysis } from '../../domain/use-cases';

export class CreateMemberAnalysisUseCase implements CreateMemberAnalysis {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly branchRepository: BranchRepository,
    private readonly roleRepository: RoleRepository,
    private readonly analysisRepository: AnalysisRepository,
  ) {}

  async create(params: CreateMemberAnalysis.Params): Promise<CreateMemberAnalysis.Result> {
    const memberExists = await this.memberRepository.findByDocuments(params.documents);
    if (memberExists?.length) throw new Error('member already exists');

    const branch = await this.branchRepository.findById(params.branchId);
    if (!branch) throw new Error('branch not found');

    const role = await this.roleRepository.findById(params.roleId);
    if (!role) throw new Error('role not found');

    const documents = params.documents.map((doc) => new Document({ type: doc.type as DocumentType, value: doc.value }));
    const baptism = new Baptism({ place: params.baptism.place, date: params.baptism.date });

    const member = new Member({
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
    });

    const analysis = await this.analysisRepository.create(member);

    return {
      id: analysis.id,
      status: AnalysisStatus.PENDING,
      member: {
        id: member.id,
        name: member.name,
        birhtDate: member.birhtDate.toISOString(),
        sex: member.sex,
        documents: member.documents.map((doc) => ({ id: 'random-uuid', ...doc })),
        email: member.email,
        phones: member.phones,
        photo: member.photo,
        memo: member.memo,
        isDead: member.isDead,
        isLeader: member.isLeader,
        cieadespel: member.cieadespel,
        cgadb: member.cgadb,
        role: { id: role.id, description: role.description },
        branch: { id: branch.id, description: branch.description },
      },
    };
  }
}
