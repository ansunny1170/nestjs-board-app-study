import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

import { ApiBody, ApiResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard()) // 컨트롤러 레벨에서 적용되는 미들웨어
export class BoardsController {
    private logger = new Logger('BoardsController')
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoard(@GetUser() user: User): Promise<Board[]> {
        this.logger.verbose(`user ${user.username} trying to get all boards`)
        return this.boardsService.getAllBoard(user);
    }

    @Get()
    getBoardList(): Promise<Board[]> {
        return this.boardsService.getBoardList();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User): Promise<Board> {
            this.logger.verbose(`user ${user.username} trying to create board. payload: ${JSON.stringify(createBoardDto)}`)
            return this.boardsService.createBoard(createBoardDto, user)
        }

    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id:number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }
    // 유저는 자신이 만든 게시물만 지울 수 있는 api
    // @Delete('/:id')
    // deleteMyBoard(
    //     @Param('id', ParseIntPipe) id:number,
    //     @GetUser() user: User
    //     ): Promise<void> {
    //     return this.boardsService.deleteBoard(id, user);
    // }

    @Patch('/:id/status')
    @ApiBody({ type: UpdateBoardDto })
    updateBoard(
        @Param('id', ParseIntPipe) id:number,
        @Body('status', BoardStatusValidationPipe) status:BoardStatus): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }

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
