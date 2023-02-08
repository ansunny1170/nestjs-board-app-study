import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum'
import { v1 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

    async getBoardById(id: number): Promise <Board> {
        // const found = await this.boardRepository.findOne(id);
        // https://stackoverflow.com/questions/72513103/type-number-has-no-properties-in-common-with-type-findoneoptionsclient
        const found = await this.boardRepository.findOne({
            where: {
                id: id
            }
        });

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
        return found;
    }
    // private boards : Board[] = [];
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }
    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }
    //     this.boards.push(board);
    //     return board;
    // }
    // getBoardById(id: string): Board {
    //     // return this.boards.find((board) => board.id === id)
    //     const found = this.boards.find((board) => board.id === id);
    //     if(!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     return found;
    // }
    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id)
    //     this.boards = this.boards.filter((board) => board.id !== id)
    //     if(!found) {
    //         throw new NotFoundException(`Can't delete Board with id ${id}`);
    //     }
    // }
    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board
    // }
}
