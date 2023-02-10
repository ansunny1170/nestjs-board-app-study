import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @Post('/signUp')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto)
    }

    @Post('signIn')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string} > {
        return this.authService.signIn(authCredentialDto)
    }

    @UseGuards(AuthGuard()) 
    @Post('/test')
    // UseGuards안에 @nestjs/passport에서 가져온 AuthGuard()를 이용하면 요청안에 유저 정보를 넣어줄 수있다.
    // 그런데 swagger에서 accessToken 사용방법을 모르겠다. `Authorize`에 입력해도 적용이 안된다.
    // postman으로 하면 정상 작동함
    test(@Req() req) {
        console.log('req', req)
    }
    @UseGuards(AuthGuard()) 
    @Post('/test1')
    test1(@GetUser() user: User) {
        console.log('req', user)
    }
}
