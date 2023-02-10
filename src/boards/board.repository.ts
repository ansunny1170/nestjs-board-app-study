import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { DataSource, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

// @EntityRepository(Board) // 상위 버전에서 사용 불가
// deprecated 되었기 때문에 다른 방식으로 custom repository를 작성한다.

export class BoardRepository extends Repository<Board> {
    constructor(@InjectRepository(Board) private dataSource: DataSource) {
        super(Board, dataSource.manager)
    }
    async createBoard(createBoardDto: CreateBoardDto, user: User) : Promise<Board> {

    const { title, description } = createBoardDto;

    const board = this.create({
        title,
        description,
        status: BoardStatus.PUBLIC,
        user
    });

    await this.save(board)
    return board;
    }
}