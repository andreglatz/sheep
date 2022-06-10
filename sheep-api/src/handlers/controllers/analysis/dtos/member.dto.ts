import { MaritalStatusDTO } from './marital-status.dto';
import { SexDTO } from './sex.dto';
import { AddressDTO } from './address.dto';
import { AdmissionDTO } from './admission.dto';
import { IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MemberDTO {
  @IsString()
  name: string;

  @IsDateString()
  birhtDate: string;

  @IsEnum(MaritalStatusDTO)
  maritalStatus: MaritalStatusDTO;

  documents: { value: string; type: 'RG' | 'CPF' }[];

  @IsEnum(SexDTO)
  sex: SexDTO;

  @IsEmail()
  email: string;

  @IsArray()
  @IsNotEmpty()
  phones: string[];

  @IsOptional()
  photo: string;

  @IsOptional()
  memo: string;

  @IsOptional()
  @IsBoolean()
  isDead?: boolean;

  @IsString()
  placeOfBirth: string;

  address: AddressDTO;
  admission: AdmissionDTO;
  branchId: string;
  isLeader: boolean;
  roleId: string;
  baptism?: { place: string; date: Date };
  cieadespel?: string;
  cgadb?: string;
}
