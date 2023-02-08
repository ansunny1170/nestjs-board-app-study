// import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BoardStatus } from '../board-status.enum';

export class CreateBoardDto {
  @IsNotEmpty()
  @ApiProperty({ description: '타이틀', example: '타이틀' })
  title: string;
  
  @IsNotEmpty()
  @ApiProperty({ description: '설명', example: '이건 설명이에요.' })
  description: string;

  @ApiProperty({ description: '설명', example: 'PUBLIC' })
  status: BoardStatus;

  
}