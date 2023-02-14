import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import * as Config from 'config'

const dbConfig = Config.get('db')
// const serverConfig = Config.get('server')

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.PG_HOSTNAME || dbConfig.host || 'localhost',
  port: process.env.PG_PORT || dbConfig.port || 5433,
  username: process.env.PG_USERNAME || dbConfig.username || 'postgres',
  password: process.env.PG_PASSWORD || dbConfig.password || 'postgres',
  database: process.env.PG_DATABASE || dbConfig.database || 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize
  // type: 'postgres',
  // host: 'localhost',
  // port: 5433,
  // username: 'postgres',
  // password: 'postgres',
  // database: 'postgres',
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  // synchronize: true
}
