import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from 'src/roles/roles.module';


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '60s' },
  }), RolesModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
