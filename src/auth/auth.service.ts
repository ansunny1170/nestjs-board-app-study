import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor (private userRepository: UserRepository) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        await this.userRepository.createUser(authCredentialDto);
    } 

    async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOne({ 
            where: {
                username: username
            }
        })

        if(user && (await bcrypt.compare(password, user.password))) {
            return 'login success'
        } else {
            throw new UnauthorizedException('login failed')
        }
    }
}
