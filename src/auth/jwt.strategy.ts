import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from './user.entity'
import { UserRepository } from './auth.repository'

import * as Config from 'config'

const jwtConfig = Config.get('jwt')

// 다른 곳에서도 주입을 해서 사용 할 수 있게 하는 데코레이터
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // PassportStrategy 클래스 상속을 하는데 passport-jwt strategy를 사용하기 위해서 `Strategy`를 넣는 것이다.
  constructor(
    private userRepository: UserRepository // UserRepository를 주입한 이유는 // 토큰이 유효한지 확인한 다음에 username 기준으로 DB에서 user info를 가져와야 하기 때문이다. // 원래라면 private위에 @InjectRepository(UserRepository) 값을 넣어야 하나 버전 변경으로 사용 방법도 같이 바뀌었다.
  ) {
    super({
      // 부모 컴포넌트를 사용하기 위한..
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret, // auth.module.ts의 secret: 'Secret1234'은 토큰 생성용
      // secretOrKey는 토큰이 유효한지 체크용, 같은 값을 넣지만 용도가 다르다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      // 토큰을 어디에서 가져오는지.. 우리는 bearer type token header에서다.
    })
  }

  // 위에서 토큰이 유효한지 확인이 되었으면 validate 메소드에서 payload에 있는 유저이름이 DB에
  // 있는 유저인지 확인 후 있다면 유저 객체를 return 한다.
  // return 값은 @UseGuards(AuthGuard())를 이용한 모든 요청의 Request Object에 들어간다.
  async validate(payload) {
    const { username } = payload
    const user: User = await this.userRepository.findOne({
      where: {
        username
      }
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
