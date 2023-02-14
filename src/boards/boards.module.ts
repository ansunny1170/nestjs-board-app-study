import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { Board } from './board.entity'
import { BoardRepository } from './board.repository'
import { BoardsController } from './boards.controller'
import { BoardsService } from './boards.service'

@Module({
  imports: [
    // TypeOrmModule.forFeature([BoardRepository])
    TypeOrmModule.forFeature([Board]),
    AuthModule
  ],
  // exports: [TypeOrmModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository]
})
export class BoardsModule {}
