import { Global, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/roles.entity';
import { RolesController } from './roles.controller';

Global()
@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
  controllers: [RolesController],
  exports:[RolesService]
})
export class RolesModule {}
