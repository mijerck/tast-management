import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor (private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCreditalsDto: AuthCredentialsDto) {

    return this.authService.signUp(authCreditalsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
