import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

import { ApiBody, ApiResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}
    // @Get()
    // @ApiResponse({
    //     description: '회원가입 API'
    // })
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }
    // @Post()
    // @ApiBody({ type: CreateBoardDto })
    // @ApiOkResponse({
    //     description: '유저 로그인',
    // })
    // @ApiUnauthorizedResponse({ description: 'Invalid Credential'})
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     // @Body('title') title: string,
    //     // @Body('description') description: string
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDto)
    // }
    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id)
    // }
    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id)
    // }
    // @Patch('/:id/status')
    // @ApiBody({ type: UpdateBoardDto })
    // updateBoardStatus(
    //     @Param('id') id: string, 
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ): Board {
    //     return this.boardsService.updateBoardStatus(id, status)
    // }

}
