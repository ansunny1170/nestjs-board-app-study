import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from './auth.repository'
import { AuthCredentialDto } from './dto/auth-credential.dto'
import { AuthADto } from './dto/auth-a.dto'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  async signUPP(authTestDto: AuthADto): Promise<void> {
    await this.userRepository.createUser1(authTestDto)
  }

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.userRepository.createUser(authCredentialDto)
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto
    const user = await this.userRepository.findOne({
      where: {
        username: username
      }
    })

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (secret + payload)
      const payload = { username }
      const accessToken = await this.jwtService.sign(payload)

      return { accessToken }
    } else {
      throw new UnauthorizedException('login failed')
    }
  }
}
