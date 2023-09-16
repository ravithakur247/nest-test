import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/roles.entity';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private _roleRepo: Repository<Role>,
        private readonly _permissionService: PermissionsService
    ) {
        this.seedData();
    }

    async getRoleDetailsById(id: number) {
        return await this._roleRepo.findOne({ where: { id: id } });
    }

    /**
    * This is for seeding database with initial data.Later on we can have specific module for the seeders
    */

    async seedData() {
        const roles = await this._roleRepo.find();
        if (roles.length <= 0) {
            await this._roleRepo.save([
                {
                    role: 'ADMIN',
                    permission: await this._permissionService.findPermissionByName('create', 'update', 'delete', 'fetch')
                },
                {
                    role: 'SELLER',
                    permission: await this._permissionService.findPermissionByName('create', 'update', 'fetch')
                },
                {
                    role: 'SUPPORTER',
                    permission: await this._permissionService.findPermissionByName('fetch', 'delete')
                },
                {
                    role: 'CUSTOMER',
                    permission: await this._permissionService.findPermissionByName('fetch')
                }
            ])
        }
    }
}
