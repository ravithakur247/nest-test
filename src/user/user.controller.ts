import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignInpDto, UserSignUpDto } from './dto/dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags("User")
export class UserController {
    constructor(
        private readonly _userService: UserService

    ) { }

    @Post('login')
    async login(@Body() loginPayload: UserSignInpDto) {
        return await this._userService.login(loginPayload)
    }

    
    @Post('sign-up')
    async signUp(@Body() payload: UserSignUpDto) {
        return await this._userService.signUp(payload)
    }

}
