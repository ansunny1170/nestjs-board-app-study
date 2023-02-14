import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'

import * as Config from 'config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const serverConfig = Config.get('server')
  const port = serverConfig.port

  const config = new DocumentBuilder()
    .setTitle('API DOCS EXAMPLE!')
    .setDescription('API 문서입니다.')
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' }, 'access-token')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(port)
  Logger.log(`Application' running on port ${port}`)
}
bootstrap()
