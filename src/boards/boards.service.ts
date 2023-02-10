import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum'
// import { v1 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        // @InjectRepository(Board) // repository pattern 적용 시 삭제
        // @InjectRepository(BoardRepository) // repository pattern 적용 시 삭제
        private boardRepository: BoardRepository,
    ) {}

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        // 아래 내용은 repository.ts 로 옮김
        // const { title, description } = createBoardDto;

        // const board = this.boardRepository.create({
        //     title,
        //     description,
        //     status: BoardStatus.PUBLIC
        // });

        // await this.boardRepository.save(board)
        // return board;
        return this.boardRepository.createBoard(createBoardDto, user);
    }

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

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find board with id ${id}`)
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;

        await this.boardRepository.save(board)

        return board;
    }
    async getAllBoard(user: User): Promise<Board[]> {
        // 내가 궁굼한 것은 아래 query의 어디에서 select 구문인지 어떻게 아나?
        // createQueryBuilder 자체가 select 기능 전용인 것인가?
        // 내 생각은 createQueryBuilder 뒤에 insert나 update가 없다면 default로 select 메소드다.
        const query = this.boardRepository.createQueryBuilder('board') // board 테이블에서

        query.where('board.userId = :userId', { userId: user.id }); // userId컬럼이 user.id값인 그 raw

        const boards = await query.getMany()

        return boards;
     }

     getBoardList(): Promise<Board[]> {
        return this.boardRepository.find();
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
