// import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BoardStatus } from '../board-status.enum';

export class CreateBoardDto {
  @IsNotEmpty()
  @ApiProperty({ description: '타이틀', example: 'title' })
  title: string;
  
  @IsNotEmpty()
  @ApiProperty({ description: '설명', example: 'descriptions' })
  description: string;

  // @ApiProperty({ description: '설명', example: 'PUBLIC' })
  // status: BoardStatus;

  
}