import { Controller, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('Roles')
export class RolesController {
    constructor(private readonly _roleService: RolesService) { }


    @Get(":id")
    async getRoleDetailsById(@Param('id') id: number) {
        return this._roleService.getRoleDetailsById(id);
    }
}
