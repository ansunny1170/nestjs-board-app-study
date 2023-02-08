// import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BoardStatus } from '../board-status.enum';

export class UpdateBoardDto {
  @ApiProperty({ description: '설명', example: 'PUBLIC' })
  status: BoardStatus;
  
}