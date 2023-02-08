// import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BoardStatus } from '../board.model';

export class UpdateBoardDto {
  @ApiProperty({ description: '설명', example: 'PUBLIC' })
  status: BoardStatus;
  
}