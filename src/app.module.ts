import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRoot(typeORMConfig), 
    //fotRoot안에 넣어준 설정(configuration)은 모든 sub-Module 부수적인 모듈들에 다 적용이 됩니다.
  ],
})
export class AppModule {}
