import { IsNotEmpty, IsString } from 'class-validator';

//학교 정보
export class HomeNewsletterDto {
  //학교 이름
  @IsNotEmpty()
  @IsString()
  schoolName: string;

  //시도교육청이름
  @IsNotEmpty()
  @IsString()
  lctnName: string;

  //학교 종류
  @IsNotEmpty()
  @IsString()
  schoolKind: string;

  //시작일
  @IsNotEmpty()
  @IsString()
  startDate: string;

  //종료일
  @IsNotEmpty()
  @IsString()
  endDate: string;
}
