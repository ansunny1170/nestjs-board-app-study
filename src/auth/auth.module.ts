import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { User } from './user.entity'
import { UserRepository } from './auth.repository'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import * as Config from 'config'

const jwtConfig = Config.get('jwt')

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // passport의 기본 전략을 jwt로 하겠다.
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret, // 토근을 만들 때 이용하는 Secret text (아무 텍스트나 넣는다.)
      signOptions: {
        expiresIn: jwtConfig.expiresIn || 3600 // 정해진 시간 이후에는 토근이 유효하지 않게 된다. 3600은 1시간이다.
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule] // 다른 모듈에서 사용하기 위해
})
export class AuthModule {}
