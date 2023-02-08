import { TypeOrmModule } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModule = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}