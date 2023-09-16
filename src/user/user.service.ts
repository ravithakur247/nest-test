import { BadRequestException, ConflictException, ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSignInpDto, UserSignUpDto } from './dto/dto';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private _userRepo: Repository<User>,
        private jwtService: JwtService,
        private readonly _roleService: RolesService

    ) { }

    async signUp(dto: UserSignUpDto) {
        try {
            const user = await this._userRepo.findOne({ where: { username: dto.username } });
            if (user) throw new ConflictException('Username already exist', { description: 'User already exist with given username' });

            const newUser = this._userRepo.create();
            newUser.username = dto.username;
            newUser.password = dto.password;
            newUser.role = await this._roleService.getRoleDetailsById(dto.role);

            return {
                data: await this._userRepo.save(newUser),
                code: HttpStatus.CREATED,
                messgae: "User created"
            }
        } catch (e) {
            console.log(e)
            throw new BadRequestException('Something bad happened', { description: 'Some error description' })

        }

    }
    async login(dto: UserSignInpDto) {
        try {
            const user = await this._userRepo.findOne({ where: { username: dto.username } });
            if (!user) throw new NotFoundException('Username not exist', { description: 'User not exist with given username' });

            const validatePassword = await bcrypt.compare(dto.password, user.password);

            if (!validatePassword) throw new ForbiddenException('wrong password', { description: 'wrong password' });

            const payload = { username: user.username, id: user.id, role: user.role };

            return {
                access_token: this.jwtService.sign(payload),
                user: user,
                code: HttpStatus.CREATED,
                messgae: "User created"
            }
        } catch (e) {
            throw new BadRequestException('Something bad happened', { description: 'Some error description' })

        }
    }
    validateToken(token: string) {
        return this.jwtService.verify(token);
    }
}
